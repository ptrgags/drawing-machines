import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';
import Oscillator from '../parts/Oscillator';

export default class OscillatorOnASphere extends Machine {
    get default_parameters() {
        return {
            trace_length: 4000
        }
    } 

    init(parameters) {
        const origin = new Point();

        const sphere = new RotatingSphere({
            parent: origin.to_joint('translate'),
            axes: [
                new Vector3(0, 1, 0),
                new Vector3(1, 0, 0),
            ], 
            angular_frequencies: [
                2,
                0.05,
            ],
        });

        const osc = new Oscillator({          
            parent: sphere.to_joint('translate'),
        });

        const trace = new Trace({
            source: osc.to_joint('translate_wave'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(sphere);
        this.add_part(osc);
        this.add_part(trace);

        return origin;
    }
}
