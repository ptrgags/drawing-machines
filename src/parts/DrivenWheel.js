import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Wheel from './Wheel';

export default class DrivenWheel extends Wheel {
    get default_parameters() {
        const wheel_params  = super.default_parameters;
        return {
            offset_angle: 0
        };
    }

    init(parameters) {
        super.init(parameters);

        // The angular velocity depends on the previous wheel in the chain
        const parent_part = this.parent.part;
        this.angular_velocity = (
            -parent_part.radius / this.radius * parent_part.angular_velocity);

        // Put the new wheel next to the previous one
        const theta = parameters.offset_angle;
        const r = this.radius + parent_part.radius;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        this.offset = new Vector3(x, 0, z);
    }

    get part_type() {
        return "driven-wheel";
    }
}
