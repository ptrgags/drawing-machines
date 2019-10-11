import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';
import Oscillator from '../parts/Oscillator';

export default class RoseCurves extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
            osc_offset: new Vector3(-3, 0, 0),
            rotation_offset: new Vector3(3, 0, 0),
            sphere_frequency: 2,
            osc_amp: 2,
            osc_frequency: 0.5,
        }
    }

    init(parameters) {
        const origin = new Point();

        const sphere = new RotatingSphere({
            parent: origin.to_joint('translate'),
            axes: [
                new Vector3(0, 1, 0),
            ],
            angular_frequencies: [
                parameters.sphere_frequency,
            ]
        });

        const osc = new Oscillator({
            parent: origin.to_joint('translate'),
            direction: new Vector3(1, 0, 0),
            frequency: parameters.osc_frequency,
            amplitude: parameters.osc_amp,
        });

        const trace = new Trace({
            source: osc.to_joint('translate_wave'),
            target: sphere.to_joint('translate'),
            origin: sphere.to_joint('translate'),
            trace_length: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(sphere);
        this.add_part(osc);
        this.add_part(trace);

        return origin;
    }
}
