import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';
import Oscillator from '../parts/Oscillator';

export default class PaperShaker extends Machine {
    get default_parameters() {
        return {
            trace_length: 8000,
            osc_offset: new Vector3(-3, 0, 0),
            rotation_offset: new Vector3(3, 0, 0),
            sphere_frequency: 4,
            osc_amp: 2,
            osc_frequency: 0.4,
        }
    }

    init(parameters) {
        const origin = new Point();
        const left = new Point({
            parent: origin.to_joint('translate'),
            offset: parameters.osc_offset,
        });

        const right = new Point({
            parent: origin.to_joint('translate'),
            offset: parameters.rotation_offset,
        });

        const osc = new Oscillator({
            parent: left.to_joint('translate'),
            direction: new Vector3(0, 1, 0).normalize(),
            frequency: parameters.osc_frequency,
            amplitude: parameters.osc_amp,
        });

        const sphere = new RotatingSphere({
            parent: right.to_joint('translate'),
            axes: [
                new Vector3(0, 1, 0),
            ],
            angular_frequencies: [
                parameters.sphere_frequency,
            ]
        });

        const trace = new Trace({
            source: sphere.to_joint('translate'),
            target: osc.to_joint('translate_wave'),
            origin: osc.to_joint('translate_wave'),
            trace_length: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(left);
        this.add_part(right);
        this.add_part(osc);
        this.add_part(sphere);
        this.add_part(trace);

        return origin;
    }
}
