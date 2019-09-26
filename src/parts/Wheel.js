import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class Wheel extends Part {
    get default_parameters() {
        return {
            radius: 1,
            half_height: 0.1,
            offset: Vector3.Zero(),
            initial_angle: 0,
            angular_velocity: 1,
            parent: undefined
        }
    }

    init(parameters) {
        super.init(parameters);

        //Parameters
        this.radius = parameters.radius;
        this.half_height = parameters.half_height;
        this.offset = parameters.offset;
        this.initial_angle = parameters.initial_angle;
        this.angular_velocity = parameters.angular_velocity;

        // Variables
        this.angle = 0; 
    }

    get transform_names() {
        return ['translate', 'rotate', 'scale'];
    }

    get primitive_names() {
        return ['wheel_primitive'];
    }

    get part_type() {
        return "wheel";
    }

    get parents() {
        return [this.parent.part];
    }

    build(scene) {
        const translate = new TransformNode(`${this.id}-translate`, scene);
        translate.position = this.offset;
        translate.parent = this.parent.node;
        this.translate = translate;

        const rotate = new TransformNode(`${this.id}-rotate`, scene);
        rotate.rotation.y = this.angle;
        rotate.parent = translate;
        this.rotate = rotate;

        const scale = new TransformNode(`${this.id}-scale`, scene);
        scale.scaling = new Vector3(this.radius, this.half_height, this.radius);
        scale.parent = rotate;
        this.scale = scale;

        const wheel = MeshBuilder.CreateCylinder(`${this.id}-wheel`, {
            diameter: 2,
            height: 2
        }, scene);
        wheel.material = new GridMaterial(`${this.id}-mat-grid`, scene);
        wheel.parent = scale;
        this.wheel_primitive = wheel;
    }

    update(t) {
        this.angle = this.angular_velocity * t + this.initial_angle;
        this.rotate.rotation.y = this.angle;
    }
}
