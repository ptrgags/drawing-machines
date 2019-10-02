import { Vector3, Quaternion } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class RotatingSphere extends Part {
    get default_parameters() {
        return {
            parent: undefined,
            radius: 2,
            axes: [
                new Vector3(0, 1, 0),
                new Vector3(0, 0, 1)
            ],
            angular_frequencies: [
                0.1,
                2,
            ],
            phases: [
                0,
                0
            ],
            show_offset: true,
        }
    }

    init(parameters) {
        super.init(parameters);
        this.radius = parameters.radius;
        this.angular_frequencies = parameters.angular_frequencies;
        this.axes = parameters.axes;
        this.phases = parameters.phases;
        this.show_offset = parameters.show_offset;
    }

    get transform_names() {
        return ['rotate', 'translate'];
    }

    get primitive_names() {
        return ['sphere_primitive', 'radius_primitive'];
    }

    get parents() {
        return [this.parent.part]
    }

    build(scene) {
        const rotate = new TransformNode(`${this.id}-rotate`, scene);
        rotate.rotationQuaternion = Quaternion.Identity();
        rotate.parent = this.parent.node;
        this.rotate = rotate;

        const translate = new TransformNode(`${this.id}-translate`, scene);
        translate.position = new Vector3(this.radius, 0, 0);
        translate.parent = rotate;
        this.translate = translate;

        if (!this.show_offset) {
            return;
        }

        const sphere = MeshBuilder.CreateSphere(`${this.id}-sphere`, {
            diameter: 0.2,
        }, scene);
        sphere.material = new GridMaterial(`${this.id}-mat-grid`, scene);
        sphere.parent = translate;
        this.sphere_primitive = sphere;

        const line = MeshBuilder.CreateLines(`${this.id}-line`, {
            points: [
                Vector3.Zero(),
                translate.position.negate()
            ]
        }, scene);
        line.parent = translate;
        this.line_primitive = line;
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
        this.rotate.rotationQuaternion = quat;
    }
}
