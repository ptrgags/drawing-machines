import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Oscillator from '../parts/Oscillator';
import Centroid from '../parts/Centroid';
import RotatingSphere from '../parts/RotatingSphere';
import Trace from '../parts/Trace';

export default class CornerTwister extends Machine {
    get default_parameters() {
        return {
            parent: undefined,
            // [top, bottom]
            amplitudes: [4, 4],
            frequencies: [2, 5],
            phases: [0, 0],
            twist_frequencies: [1, 2],
            half_height: 2,
        }
    }

    get_corner_offsets(half_height) {
        const hh = half_height;
        return [
            new Vector3(hh, 0, hh),
            new Vector3(-hh, 0, hh),
            new Vector3(-hh, 0, -hh),
            new Vector3(hh, 0, -hh),
        ]
    }

    make_twists(parameters, centers) {
        return centers.map((center, i) => {
            return new RotatingSphere({
                parent: centers[i].to_joint('translate'),
                axes: [new Vector3(0, 1, 0)],
                angular_frequencies: [parameters.twist_frequencies[i]],
                phases: [0, 0]
            });
        });
    }

    make_offsets(parameters, twist) {
        const corners = this.get_corner_offsets(parameters.half_height);
        return corners.map((corner) => {
            return new Point({
                parent: twist.to_joint('rotate'),
                offset: corner,
                show_offset: true,
            });
        });
    }

    init(parameters) {
        const origin = new Point({
            parent: parameters.parent,
            offset: Vector3.Zero(),
            show_offset: false
        });

        const top = new Point({
            parent: origin.to_joint('translate'),
            offset: new Vector3(0, parameters.half_height, 0),
            show_offset: true,
        });
        const bottom = new Point({
            parent: origin.to_joint('translate'),
            offset: new Vector3(0, -parameters.half_height, 0),
            show_offset: true,
        });
        
        const [top_twist, bottom_twist] = this.make_twists(
            parameters, [top, bottom]);

        const top_offsets = this.make_offsets(parameters, top_twist);
        const bottom_offsets = this.make_offsets(parameters, bottom_twist);

        /*
        const top_oscs = this.make_oscillators(parameters, top_offsets, 0);
        const bottom_oscs = this.make_oscillators(
            parameters, bottom_offsets, 1);

        const centroids = this.make_centroids(origin, top_oscs, bottom_oscs);
        const traces = this.make_traces(origin, centroids);

        const centroid = new Centroid({
            points: oscs.map(x => x.to_joint('translate_wave')),
            origin: origin.to_joint('translate'),
            weights: parameters.weights
        });
        const trace = new Trace({ 
            source: centroid.to_joint('translate'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length
        });
        */

        this.add_part(origin);
        this.add_parts([top, bottom]);
        this.add_parts([top_twist, bottom_twist]);
        this.add_parts(top_offsets);
        this.add_parts(bottom_offsets);
        /*
        this.add_parts(oscs);
        this.add_part(centroid, 'centroid');
        this.add_part(trace);
        */

        return origin;
    }
}
