export default class Joint {
    constructor(part, node_name) {
        this.part = part;
        this.node_name = node_name;
    }

    get node() {
        return this.part[this.node_name];
    }
}
