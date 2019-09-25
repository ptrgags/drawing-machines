import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Oscillator from '../parts/Oscillator';
import Centroid from '../parts/Centroid';
import Trace from '../parts/Trace';
import Prefab from '../parts/Prefab';
import AverageBox from './AverageBox';

/**
 * 12 points oscillating on the edges of a cuboid. The curve is defined to be
 * the centroid of all 12 positions.
 */
export default class DoubleAverageBox extends Machine {
    get default_parameters() {
        return { 
            parent: undefined,
            box_parameters: {
                trace_length: 1000,
            },
            trace_length: 2000,
            offset: new Vector3(4, 0, 4)
        }
    }

    init(parameters) {
        const origin = new Point({
            show_offset: true
        });
        const left = new Point({
            parent: origin.to_joint('translate'),
            offset: parameters.offset,
            show_offset: true
        });
        const right = new Point({
            parent: origin.to_joint('translate'),
            offset: parameters.offset.scale(-1.0),
            show_offset: true
        });
        const left_box = new Prefab({
            machine_class: AverageBox,
            machine_parameters: parameters.box_parameters,
            parent: left.to_joint('translate'),
        });
        const right_box = new Prefab({
            machine_class: AverageBox,
            machine_parameters: parameters.box_parameters,
            parent: right.to_joint('translate'),
        });
        
        const centroid = new Centroid({
            points: [
                left_box.to_joint('centroid.translate'),
                right_box.to_joint('centroid.translate')
            ],
            weights: [1, 1],
            origin: origin.to_joint('translate'),
        });
        const trace = new Trace({ 
            source: centroid.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(left);
        this.add_part(right);
        this.add_part(left_box);
        this.add_part(right_box);
        this.add_part(centroid);
        this.add_part(trace);

        return origin;
    }
}
