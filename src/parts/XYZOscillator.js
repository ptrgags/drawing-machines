import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class XYZOscillator extends Part {
    get default_parameters() {
        return {
            parent: undefined,
            amplitudes: new Vector3(1, 1, 1),
            frequencies: new Vector3(1, 0.1, 1),
            phases: new Vector3(0, 0, Math.PI / 2),
        }
    }

    init(parameters) {
        super.init(parameters);
        this.frequencies = parameters.frequencies;
        this.phases = parameters.phases;
        this.amplitudes = parameters.amplitudes;
    }

    get transform_names() {
        return ['translate', 'translate_wave'];
    }

    get primitive_names() {
        return ['sphere_primitive'];
    }

    get part_type() {
        return 'xyzosc';
    }

    get parents() {
        if (this.parent !== undefined) {
            return [this.parent.part];
        }

        return [];
    }

    build(scene) {
        const translate_wave = new TransformNode(
            `${this.id}-translate-wave`, scene);
        translate_wave.position = this.compute_wave(0);
        if (this.parent !== undefined) {
            translate_wave.parent = this.parent.node;
        }
        this.translate_wave = translate_wave;

        const sphere = MeshBuilder.CreateSphere(`${this.id}-sphere`, {
            diameter: 0.2,
        }, scene);
        sphere.material = new GridMaterial(`${this.id}-mat-grid`, scene);
        sphere.parent = translate_wave;
        this.sphere_primitive = sphere;
    }

    compute_wave(t) {
        const theta_x = 2.0 * Math.PI * this.frequencies.x * t + this.phases.x;
        const theta_y = 2.0 * Math.PI * this.frequencies.y * t + this.phases.y;
        const theta_z = 2.0 * Math.PI * this.frequencies.z * t + this.phases.z;
        const wave_x = this.amplitudes.x * Math.sin(theta_x);
        const wave_y = this.amplitudes.y * Math.sin(theta_y);
        const wave_z = this.amplitudes.z * Math.sin(theta_z);
        return new Vector3(wave_x, wave_y, wave_z);
    }

    update(t) {
        this.translate_wave.position = this.compute_wave(t);
    }
}
