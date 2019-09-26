import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';
import Sine from '../waves/Sine';

export default class XYZOscillator extends Part {
    get default_parameters() {
        return {
            parent: undefined,
            amplitudes: new Vector3(1, 1, 1),
            frequencies: new Vector3(1, 0.1, 1),
            phases: new Vector3(0, 0, Math.PI / 2),
            waves: [new Sine(), new Sine(), new Sine()]
        }
    }

    init(parameters) {
        super.init(parameters);
        this.frequencies = parameters.frequencies;
        this.phases = parameters.phases;
        this.amplitudes = parameters.amplitudes;
        this.waves = parameters.waves;
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
        const [wave_x, wave_y, wave_z] = this.waves;
        const val_x = this.amplitudes.x * wave_x.compute(theta_x);
        const val_y = this.amplitudes.y * wave_y.compute(theta_y);
        const val_z = this.amplitudes.z * wave_z.compute(theta_z);
        return new Vector3(val_x, val_y, val_z);
    }

    update(t) {
        this.translate_wave.position = this.compute_wave(t);
    }
}
