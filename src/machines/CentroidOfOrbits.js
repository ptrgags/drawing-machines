import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';

export default class CentroidOfOrbits extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000
        }
    }

    init(parameters) {
        const origin = new Point();
        const trace = new Trace({
            source: origin.to_joint('translate'),
            target: origin.to_joint('translate'),
            origin: origin.to_joint('translate'),
            trace_length: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(trace);

        return origin;
    }
}
