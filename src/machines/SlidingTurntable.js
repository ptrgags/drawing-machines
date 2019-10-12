import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import Oscillator from '../parts/Oscillator';
import RotatingSphere from '../parts/RotatingSphere';

export default class SlidingTurntable extends Machine {
    get default_parameters() {
        return {
            trace_length: 4000,
            angular_frequencies: [
                2,
                0.1
            ],
        }
    }

    init(parameters) {
        const origin = new Point();
        const osc = new Oscillator({
            parent: origin.to_joint('translate'),
            direction: new Vector3(0, 0, 1),
        });
        const offset = new Point({
            parent: osc.to_joint('translate_wave'),
            offset: new Vector3(0, -3, 0),
            show_offset: true,
        });
        const sphere = new RotatingSphere({
            parent: offset.to_joint('translate'),
            axes: [
                new Vector3(1, 0, 0),
                new Vector3(0, 1, 0),
            ],
            start_direction: new Vector3(0, 0, 1),
            angular_frequencies: parameters.angular_frequencies,
        });
        const trace = new Trace({
            source: sphere.to_joint('translate'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(osc);
        this.add_part(offset);
        this.add_part(sphere);
        this.add_part(trace);

        return origin;
    }
}
