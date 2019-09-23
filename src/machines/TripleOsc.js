import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import XYZOscillator from '../parts/XYZOscillator';

export default class TripleOsc extends Machine {
    get default_parameters() {
        return {
            amplitudes: new Vector3(1, 1, 1),
            frequencies: new Vector3(1, 0.1, 3),
            phases: new Vector3(0, 0, Math.PI / 2),
            trace_length: 2000
        }
    }

    init(parameters) {
        const origin = new Point({
            offset: Vector3.Zero(),
            show_offset: false
        });
        const osc = new XYZOscillator({
            parent: origin.to_joint('translate'),
            amplitudes: parameters.amplitudes,
            frequencies: parameters.frequencies,
            phases: parameters.phases
        });
        const trace = new Trace({ 
            source: osc.to_joint('translate_wave'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(osc);
        this.add_part(trace);

        return origin;
    }
}
