import { Vector3, Matrix } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class Arm extends Part {
    constructor(parameters) {
        super(parameters);

        [this.start_parent, this.end_parent] = parameters.parents;

        //Babylon primitives
        this.rotate = undefined;
        this.scale = undefined;
    }

    get parents() {
        return [
            this.start_parent.part,
            this.end_parent.part
        ];
    }

    get arm_vector() {
        const p1 = this.start_parent.position;
        const p2 = this.end_parent.position;
        const w = p2.subtract(p1);
        const arm_len = w.length();

        const M1 = this.start_parent.matrix;
        const M1_inv = Matrix.Invert(M1);
        const w2 = Vector3.TransformCoordinates(p2, M1_inv);
        const angle = -Math.atan2(w2.z, w2.x);

        return {
            arm_len,
            angle
        }
    }

    build(scene) {
        const arm_vec = this.arm_vector;

        const rotate = new TransformNode(`${this.id}-rotate`, scene);
        rotate.rotation.y = arm_vec.angle;
        rotate.parent = this.start_parent.node;
        this.rotate = rotate;

        const scale = new TransformNode(`${this.id}-scale`, scene);
        scale.scaling.x = arm_vec.arm_len;
        scale.parent = rotate;
        this.scale = scale;

        const arm = MeshBuilder.CreateLines(`${this.id}-line`, {
            points: [
                Vector3.Zero(),
                new Vector3(1, 0, 0)
            ]
        }, scene);
        arm.parent = scale;
        this.arm_primitive = arm;
    }

    update(t) {
        const arm_vec  = this.arm_vector;
        this.rotate.rotation.y = arm_vec.angle;
        this.scale.scaling.x = arm_vec.arm_len;
    }
}
