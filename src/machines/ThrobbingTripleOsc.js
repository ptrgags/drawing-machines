import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import XYZOscillator from '../parts/XYZOscillator'; 
import Scaler from '../parts/Scaler';

export default class ThrobbingTripleOsc extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
        }
    }

    init(parameters) {
        const origin = new Point();
        const scaler = new Scaler({
            parent: origin.to_joint('translate'),
        });
        const osc = new XYZOscillator({
            parent: scaler.to_joint('scale'),
        });

        const trace = new Trace({
            source: osc.to_joint('translate_wave'),
            target: origin.to_joint('translate'),
            origin: origin.to_joint('translate'),
            trace_length: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(scaler);
        this.add_part(osc);
        this.add_part(trace);

        return origin;
    }
}
