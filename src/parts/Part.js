import Joint from "../Joint";

let part_count = 0;

export default class Part {
    static make_id() {
        const id = part_count;
        part_count++;
        return id;
    } 

    get part_type() {
        return 'part';
    }

    constructor(parameters) {
        this.id = `${this.part_type}-${Part.make_id()}`;
    }

    get parents() {
        return [];
    }

    update(t) {

    }

    to_joint(node_name) {
        return new Joint(this, node_name);
    }
}
