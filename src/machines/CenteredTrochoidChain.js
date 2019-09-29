import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import CenteredTrochoid from '../parts/CenteredTrochoid';

export default class CenteredTrochoidChain extends Machine {
    get default_parameters() {
        return {
            parent: undefined,
            radii: [2.5, 2, -0.1],
            angular_frequencies: [2, 3],
            offset: new Vector3(1.3, 0, 0),
            trace_length: 4000,
            time_step: 1/200,
        }
    }

    make_trochoids(parameters, origin) {
        const trochoids = [];
        const N = parameters.angular_frequencies.length;
        const radii = parameters.radii;
        let current_parent = origin.to_joint('translate');
        for (let i = 0; i < N; i++) {
            const trochoid = new CenteredTrochoid({
                parent: current_parent,
                angular_frequency: parameters.angular_frequencies[i],
                frame_radius: radii[i],
                frame_phase: 0,
                wheel_radius: radii[i + 1],
                wheel_phase: 0,
                show_radii: true, 
            });
            trochoids.push(trochoid);
            current_parent = trochoid.to_joint('rotate_wheel');
        }
        return trochoids;
    }

    init(parameters) {
        this._time_step = parameters.time_step;
        const origin = new Point({
            parent: parameters.parent,
            offset: Vector3.Zero(),
            show_offset: false
        });

        const trochoids = this.make_trochoids(parameters, origin);
        const last_trochoid = trochoids[trochoids.length - 1];
        last_trochoid.offset = parameters.offset;

        const trace = new Trace({ 
            source: last_trochoid.to_joint('translate_offset'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_parts(trochoids);
        this.add_part(trace);

        return origin;
        
    }

    get time_step() {
        return this._time_step;
    }
}
