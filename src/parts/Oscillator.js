import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class Oscillator extends Part {
    constructor(parameters) {
        super(parameters);

        // extract the parameters
        this.parent = parameters.parent;
        this.offset = parameters.offset;
        this.amplitude = parameters.amplitude;
        this.phase = parameters.phase;
        this.direction = parameters.direction;
        this.frequency = parameters.frequency;
        this.radius = parameters.radius;

        // BabylonJS objects
        this.translate = undefined;
        this.translate_wave = undefined;
        this.scale = undefined;
        this.line_primitive = undefined;
        this.sphere_primitive = undefined;
    }

    get part_type() {
        return 'osc';
    }

    build(scene) {
        const translate = new TransformNode(`${this.id}-translate`, scene);
        translate.position = this.offset;
        if (this.parent !== undefined) {
            translate.parent = this.parent.node;
        }
        this.translate = translate;

        const translate_wave = new TransformNode(
            `${this.id}-translate-wave`, scene);
        translate_wave.position = Vector3.Zero();
        translate_wave.parent = translate;
        this.translate_wave = translate_wave;

        const sphere = MeshBuilder.CreateSphere(`${this.id}-sphere`, {
            diameter: 2 * this.radius,
        }, scene);
        sphere.material = new GridMaterial(`${this.id}-mat-grid`, scene);
        sphere.parent = translate_wave;

        const line = MeshBuilder.CreateLines(`${this.id}-line`, {
            points: [
                this.direction.scale(this.amplitude),
                this.direction.scale(-this.amplitude)
            ]
        }, scene);
        line.parent = translate;
    }

    update(t) { 
        const wave = this.amplitude * Math.sin(
            2.0 * Math.PI * this.frequency * t + this.phase);
        const wave_offset = this.direction.scale(wave);
        this.translate_wave.position = wave_offset;
    }
}
