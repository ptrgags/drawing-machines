export default class Machine {
    constructor(parameters) {
        // map of part id -> part
        this.part_table = new Map();

        // part ids, the ver
        this.vertices = [];
        // Map of parent id -> [child id]
        this.edges = new Map();
        // Optional map of label -> id
        this.labels = new Map();

        // True if vertices are in topologically sorted order.
        this.is_sorted = true;

        // Initialize the machine based on parameters
        this.root_part = this.init({...this.default_parameters, ...parameters});
    }

    get machine_type() {
        return 'machine';
    }
    
    // Return some default parameters to set an example to the user 
    get default_parameters() {
        return {
            parent: undefined,
        };
    }

    get time_step() {
        return 1 / 60;
    }

    add_edge(parent_id, child_id) {
        if (!this.edges.has(parent_id)) {
            this.edges.set(parent_id, []);
        }

        this.edges.get(parent_id).push(child_id);
    }

    add_part(part, label) {
        // Add the part to a lookup table and add a vertex to the DAG
        const id = part.id;
        this.vertices.push(id);
        this.part_table.set(id, part);
        this.labels.set(label, id);

        // Mark the topological sorting as invalid
        this.is_sorted = false;

        // Add edges to the DAG
        for (let parent of part.parents) {
            const parent_id = parent.id;
            this.add_edge(parent_id, id);
        }
    }

    add_parts(parts) {
        for (let part of parts) {
            this.add_part(part);
        }
    }

    get_part(part_id) {
        return this.part_table.get(part_id);
    }
    
    find_part(label) {
        const part_id = this.labels.get(label);
        return this.get_part(part_id);
    }

    postorder(vertex, visited, results) {
        // Skip if we've already seen this node
        if (visited.has(vertex)) {
            return;
        }

        // Add this to the visited list
        visited.add(vertex);

        // Recurse
        const children = this.edges.get(vertex) || [];
        for (let child_id of children) {
            this.postorder(child_id, visited, results);
        }

        // Finally, add our vertex at the end
        results.push(vertex);
    }

    get is_empty() {
        return this.vertices.length == 0;
    }

    /**
     * sort this.nodes
     */
    topological_sort() {
        // Empty DAG is always sorted!
        if (this.is_empty) {
            return;
        }

        // do a DFS on the DAG to order the nodes in reverse topological sort 
        // order
        const visited = new Set();
        const path = [];
        for (let vertex of this.vertices) {
            this.postorder(vertex, visited, path);
        }

        // Reversing the path gives the topological sort order, i.e. the
        // order in which we will update the parts respecting dependencies
        path.reverse();
        this.vertices = path;
    }

    /**
     * Iterate over the parts in topologically sorted order. If not
     * already sorted, the DAG will be sorted automatically.
     * This is O(n) where n is the number of nodes.
     */
    * parts() {
        if (!this.is_sorted) {
            this.topological_sort();
            this.is_sorted = true;
        }

        for (let vertex of this.vertices) {
            yield this.part_table.get(vertex);
        }
    }
    
    init(parameters) {
        // Subclasses will initialize the parts
        return undefined;
    }

    build(scene) {
        let root_primitive = undefined;
        for (let part of this.parts()) {
            const primitive = part.build(scene);
            if (root_primitive === undefined) {
                root_primitive = primitive;
            }
        }
        return root_primitive;
    }

    update(t) {
        for (let part of this.parts()) {
            part.update(t);
        }
    }
}
