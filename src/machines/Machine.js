export default class Machine {
    constructor(parameters) {
        // map of component id -> component
        this.component_table = new Map();

        // component ids, the ver
        this.vertices = [];
        // Map of parent id -> [child id]
        this.edges = new Map();

        // True if vertices are in topologically sorted order.
        this.is_sorted = true;

        // Initialize the machine based on parameters
        this.init({...this.default_parameters, ...parameters});
    }
    
    // Return some default parameters to set an example to the user 
    get default_parameters() {
        return {};
    }

    add_edge(parent_id, child_id) {
        if (!this.edges.has(parent_id)) {
            this.edges.set(parent_id, []);
        }

        this.edges.get(parent_id).push(child_id);
    }

    add_component(component) {
        // Add the component to a lookup table and add a vertex to the DAG
        const id = component.id;
        this.vertices.push(id);
        this.component_table.set(id, component);

        // Mark the topological sorting as invalid
        this.is_sorted = false;

        // Add edges to the DAG
        for (let parent of component.parents) {
            const parent_id = parent.id;
            this.add_edge(parent_id, id);
        }
    }

    post_order(vertex, visited, results) {
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
        // order in which we will update the components respecting dependencies
        path.reverse();
        this.vertices = path;
    }

    /**
     * Iterate over the components in topologically sorted order. If not
     * already sorted, the DAG will be sorted automatically.
     * This is O(n) where n is the number of nodes.
     */
    * components() {
        if (!this.is_sorted) {
            this.topological_sort();
        }

        for (let vertex of this.vertices) {
            yield this.component_table.get(vertex);
        }
    }
    
    init(parameters) {
        // Subclasses will initialize the primitives here
    }

    /**
     * 
     */
    build(scene) {
        let root_primitive = undefined;
        for (let component of this.components()) {
            const primitive = component.build(scene);
            if (root_primitive === undefined) {
                root_primitive = primitive;
            }
        }
        return root_primitive;
    }

    update(t) {
        for (let component of this.components()) {
            component.update(t);
        }
    }
}
