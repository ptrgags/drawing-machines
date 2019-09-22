import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';

export default class SphericalSpirals extends Machine {
    get default_parameters() {
        return {
            axes: [
                //new Vector3(1, 0, 0),
                new Vector3(0, 1, 0),
                new Vector3(0, 0, 1)
            ],
            angular_frequencies: [
                //2,
                0.1,
                2,
            ],
            phases: [
                //0,
                0,
                0
            ],
            radius: 2,
            trace_length: 10000
        }
    }

    init(parameters) {
        const origin = new Point({
            offset: Vector3.Zero(),
            show_offset: false
        });
        const sphere = new RotatingSphere({
            parent: origin.to_joint('translate'),
            radius: parameters.radius,
            axes: parameters.axes,
            angular_frequencies: parameters.angular_frequencies,
            phases: parameters.phases
        });
        const trace = new Trace({ 
            source: sphere.to_joint('translate'),
            num_points: parameters.trace_length
        });
        
        this.add_part(origin);
        this.add_part(sphere);
        this.add_part(trace);

        return origin;
    }
}
