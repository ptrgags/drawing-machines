import { Vector3 } from "@babylonjs/core/Maths/math";

export default class Joint {
    constructor(part, node_name) {
        this.part = part;
        this.node_name = node_name;
    }

    get node() {
        return this.part[this.node_name];
    }

    get matrix() {
        return this.node.getWorldMatrix();
    }

    get position() {
        return Vector3.TransformCoordinates(Vector3.Zero(), this.matrix);
    }
}
