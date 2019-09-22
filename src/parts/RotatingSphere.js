import { Vector3, Quaternion } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class RotatingSphere extends Part {
    constructor(parameters) {
        super(parameters);

        this.parent = parameters.parent;
        this.radius = parameters.radius;
        this.angular_frequencies = parameters.angular_frequencies;
        this.axes = parameters.axes;
        this.phases = parameters.phases;

        this.rotation = undefined;
        this.translate = undefined;
        this.sphere_primitive = undefined;
    }

    get parents() {
        return [this.parent.part]
    }

    build(scene) {
        const rotation = new TransformNode(`${this.id}-rotate`, scene);
        rotation.rotationQuaternion = Quaternion.Identity();
        rotation.parent = this.parent.node;
        this.rotation = rotation;

        const translate = new TransformNode(`${this.id}-translate`, scene);
        translate.position = new Vector3(this.radius, 0, 0);
        translate.parent = rotation;
        this.translate = translate;

        const sphere = MeshBuilder.CreateSphere(`${this.id}-sphere`, {
            diameter: 0.2,
        }, scene);
        sphere.material = new GridMaterial(`${this.id}-mat-grid`, scene);
        sphere.parent = translate;
        this.sphere_primitive = sphere;
    }

    compute_angles(t) {
        const angles = [];
        for (let i = 0; i < this.phases.length; i++) {
            const phase = this.phases[i];
            const angular_freq = this.angular_frequencies[i];
            const angle = angular_freq * t + phase;
            angles.push(angle);
        }
        return angles;
    }

    compose_rotations(angles) {
        let total_rotation = Quaternion.Identity();
        for (let i = 0; i < this.axes.length; i++) {
            const quat = Quaternion.RotationAxis(this.axes[i], angles[i]);
            total_rotation = quat.multiply(total_rotation); 
        }
        return total_rotation;
    } 

    update(t) {
        const angles = this.compute_angles(t);  
        const quat = this.compose_rotations(angles);
        this.rotation.rotationQuaternion = quat;
    }
}
