import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Oscillator from '../parts/Oscillator';
import Centroid from '../parts/Centroid';
import Trace from '../parts/Trace';

/**
 * 12 points oscillating on the edges of a cuboid. The curve is defined to be
 * the centroid of all 12 positions.
 */
export default class AverageBox extends Machine {
    get default_parameters() {
        return { 
            // Dimensions of the scale of the box in each dimension. These
            // will also be the amplitudes of the oscillation
            size: new Vector3(3, 3, 3),
            // Frequencies of each point's oscillation in cycles/sec
            //frequencies: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
            frequencies: [1, 2, 23, 11, 7, 43, 13, 2, 3, 4, 5, 6].map(x => x / 100),
            /*
            frequencies: [
                0.1, 
                0.2, 
                0.3, 
                0.4, 
                0.5, 
                0.6, 
                0.7, 
                0.8, 
                0.9, 
                1.0, 
                1.1, 
                1.2
            ],
            */
            // Weights of each point since the centroid is a weighted avverage
            weights: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            // Phases of oscillation to tweak things further
            phases: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            // How many points in the trace
            trace_length: 10000,
        }
    }

    static get NUM_OSCILATORS() {
        return 12;
    }

    static get DIRECTIONS() {
        const right = new Vector3(1, 0, 0);
        const up = new Vector3(0, 1, 0);
        const back = new Vector3(0, 0, 1);
        const left = new Vector3(-1, 0, 0);
        const down = new Vector3(0, -1, 0);
        const front = new Vector3(0, 0, -1);
        return {
            up,
            down,
            left,
            right,
            front,
            back
        };
    }

    static get OSCILATION_DIRECTIONS() {
        const dirs = this.DIRECTIONS;
        return [
            dirs.right, 
            dirs.right, 
            dirs.right, 
            dirs.right,
            dirs.up, 
            dirs.up, 
            dirs.up, 
            dirs.up,
            dirs.back, 
            dirs.back, 
            dirs.back, 
            dirs.back
        ];
    }

    get_offsets(parameters) {
        const size = parameters.size;
        const dirs = AverageBox.DIRECTIONS;
        const front = dirs.front.scale(size.z);
        const back = dirs.back.scale(size.z);
        const left = dirs.left.scale(size.x);
        const right = dirs.right.scale(size.x);
        const up = dirs.up.scale(size.y);
        const down = dirs.down.scale(size.y);
        return [
            front.add(up),
            front.add(down),
            back.add(up),
            back.add(down),
            front.add(left),
            front.add(right),
            back.add(left),
            back.add(right),
            left.add(up),
            left.add(down),
            right.add(up),
            right.add(down)
        ];
    }

    get_amplitudes(parameters) {
        const size = parameters.size;        
        return [
            size.x,
            size.x,
            size.x,
            size.x,
            size.y,
            size.y,
            size.y,
            size.y,
            size.z,
            size.z,
            size.z,
            size.z
        ];
    } 
    
    make_oscillators(parameters, origin) {
        const oscillators = [];
        const size = parameters.size;
        const phases = parameters.phases;
        const frequencies = parameters.frequencies;
        const dirs = AverageBox.OSCILATION_DIRECTIONS;
        const offsets = this.get_offsets(parameters);
        const amplitudes = this.get_amplitudes(parameters);
        const origin_joint = origin.to_joint('translate');
        const radius = 0.2;

        for (let i = 0; i < AverageBox.NUM_OSCILATORS; i++) {
            const osc = new Oscillator({
                parent: origin_joint,
                offset: offsets[i],
                direction: dirs[i],
                amplitude: amplitudes[i],
                frequency: frequencies[i],
                phase: phases[i],
                radius: radius
            });
            oscillators.push(osc);
        }
        return oscillators;
    }

    init(parameters) {
        const origin = new Point({
            offset: Vector3.Zero(),
            show_offset: false
        });
        const oscs = this.make_oscillators(parameters, origin);
        const centroid = new Centroid({
            points: oscs.map(x => x.to_joint('translate_wave')),
            origin: origin.to_joint('translate'),
            weights: parameters.weights
        });
        const trace = new Trace({ 
            source: centroid.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_parts(oscs);
        this.add_part(centroid);
        this.add_part(trace);

        return origin;
    }
}
