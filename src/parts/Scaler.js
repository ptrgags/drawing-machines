import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';
import Sine from '../waves/Sine';

export default class Scaler extends Part { 
    get default_parameters() {
        return {
            parent: undefined,
            wave: new Sine(),
            amplitude: 1,
            frequency: 1,
            phase: 0
        };
    }

    init(parameters) {
        super.init(parameters);

        this.wave = parameters.wave;
        this.phase = parameters.phase;
        this.frequency = parameters.frequency;
        this.amplitude = parameters.amplitude;
    }

    build(scene) {
        const factor = this.wave.compute(0);
        const scale = new TransformNode(`${this.id}-scale`, scene);
        scale.scaling = new Vector3(1, 1, 1).scale(factor);
        if (this.parent !== undefined) {
            scale.parent = this.parent.node;
        }
        this.scale = scale;
    }

    update(t) {
        const factor = this.amplitude * this.wave.compute(
            this.frequency * t + this.phase);
        this.scale.scaling = new Vector3(1, 1, 1).scale(factor);
    }
}
