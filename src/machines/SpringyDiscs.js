import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';
import Oscillator from '../parts/Oscillator';

export default class SpringyDiscs extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
            offsets: [1, 3, 2],
            angular_frequencies: [1, 2, 1.5],
            amplitudes: [0.5, 0.25, 1],
            num_discs: 3,
        }
    }

    make_osc_disc(parameters, parent_joint, i) {
        const sphere = new RotatingSphere({
            parent: parent_joint,
            axes: [
                new Vector3(0, 1, 0),
            ],
            angular_frequencies: [
                parameters.angular_frequencies[i]
            ],
        });

        const offset = new Point({
            parent: sphere.to_joint('translate'),
            offset: new Vector3(0, parameters.offsets[i], 0),
            show_offset: true
        });

        const osc = new Oscillator({
            parent: offset.to_joint('translate'),
            amplitude: parameters.amplitudes[i],
        });

        this.add_part(sphere);
        this.add_part(offset);
        this.add_part(osc);
        return osc.to_joint('translate_wave');
    }

    init(parameters) {
        const origin = new Point();

        let joint = origin.to_joint('translate');
        for (let i = 0; i < parameters.num_discs; i++) {
            joint = this.make_osc_disc(parameters, joint, i);
        }

        const trace = new Trace({
            source: joint,
            origin: origin.to_joint('translate'),
            trace_length: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(trace);

        return origin;
    }
}
