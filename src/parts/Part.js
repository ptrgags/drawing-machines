import Joint from "../Joint";

let part_count = 0;

export default class Part {
    static make_id() {
        const id = part_count;
        part_count++;
        return id;
    } 

    constructor(parameters) {
        this.init({...this.default_parameters, ...parameters});
        this.id = `${this.part_type}-${Part.make_id()}`;
    }

    get part_type() {
        return 'part';
    }

    /**
     * Subclasses must list the property names that contain BabylonJS
     * transform nodes. This is for documentation purposes
     */
    get transform_names() {
        return [];
    }

    /**
     * Subclasses must list the property names that contain BabylonJS
     * primitives
     */
    get primitive_names() {
        return [];
    }

    get default_parameters() {
        return {
            parent: undefined
        };
    }

    change_parent(parent) {
        this.parent = parent;
    }

    init(parameters) {
        // Most often there is a single parent
        this.parent = parameters.parent;
    }

    get parents() {
        // Most often, there is a single parent
        if (this.parent !== undefined) {
            return [this.parent.part];
        }
        return [];
    }

    update(t) {

    }

    build(scene) {

    }

    to_joint(node_name) {
        return new Joint(this, node_name);
    }
}
