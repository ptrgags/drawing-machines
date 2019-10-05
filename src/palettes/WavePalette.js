import { Color4 } from "@babylonjs/core/Maths/math";

import Palette from './Palette';
import Sine from '../waves/Sine';

export default class WavePalette extends Palette {
    get default_parameters() {
        return {
            waves: [new Sine(), new Sine(), new Sine(), new Sine()],
            biases: [0.3, 0.5, 0.6, 1.0],
            amplitudes: [0.5, 0.7, 0.5, 0],            
            frequencies: [1, 4, 10, 0],
            phases: [0.6, 0.1, 0.4, 0]
        }
    }

    constructor(parameters) {
        super();
        this.init({...this.default_parameters, ...parameters});
    }

    init(parameters) {
        this.waves = parameters.waves;
        this.biases = parameters.biases;
        this.amplitudes = parameters.amplitudes;
        this.frequencies = parameters.frequencies;
        this.phases = parameters.phases;
    }

    get_color(t) { 
        const components = [];
        for (let i = 0; i < 4; i++) {
            const wave = this.waves[i];
            const bias = this.biases[i];
            const amp = this.amplitudes[i];
            const freq = this.frequencies[i];
            const phase = this.phases[i];

            const angle = 2 * Math.PI * (freq * t + phase);
            const component = bias + amp * wave.compute(angle);
            components.push(component);
        }

        return new Color4(...components);
    }
}
