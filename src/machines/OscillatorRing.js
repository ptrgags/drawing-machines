import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import Oscillator from '../parts/Oscillator';
import RotatingSphere from '../parts/RotatingSphere';
import Fourier from '../waves/Fourier';

export default class OscillatorRing extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
            num_oscs: 6,
            rotation_freq: 1,
            osc_freq: 0.1,
            radius: 2,
            wave: new Fourier({
                amplitudes: [1, 2, 3],
                frequencies: [2, 4, 8],
            }),
        }
    }

    make_oscs(parameters, ring) {
        const results = [];
        const N = parameters.num_oscs;
        const radius = parameters.radius;
        const wave = parameters.wave;
        const freq = parameters.osc_freq;
        for (let i = 0; i < N; i++) {
            const theta = 2 * Math.PI * i / N;
            const offset = new Vector3(Math.cos(theta), 0, Math.sin(theta));
            const osc = new Oscillator({
                parent: ring.to_joint('rotate'),
                direction: new Vector3(0, 1, 0),
                offset: offset.scale(radius),
                frequency: freq,
                wave,
            });
            results.push(osc);
        }
        return results;
    }

    make_traces(parameters, origin, oscs) {
        return oscs.map(osc => {
            return new Trace({
                source: osc.to_joint('translate_wave'),
                origin: origin.to_joint('translate'),
            });
        });
    }

    init(parameters) {
        const origin = new Point();
        const ring = new RotatingSphere({
            parent: origin.to_joint('translate'),
            radius: parameters.radius,
            axes: [
                new Vector3(0, 1, 0),
            ],
            angular_frequencies: [
                parameters.rotation_freq
            ]
        });

        const oscs = this.make_oscs(parameters, ring);
        const osc_traces = this.make_traces(parameters, origin, oscs);

        this.add_part(origin);
        this.add_part(ring);
        this.add_parts(oscs);
        this.add_parts(osc_traces);

        return origin;
    }
}
