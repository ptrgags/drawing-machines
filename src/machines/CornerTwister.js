import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Oscillator from '../parts/Oscillator';
import Centroid from '../parts/Centroid';
import RotatingSphere from '../parts/RotatingSphere';
import Trace from '../parts/Trace';
import Sine from '../waves/Sine';
import Square from '../waves/Square';

export default class CornerTwister extends Machine {
    get default_parameters() {
        return {
            parent: undefined,
            // [top, bottom]
            amplitudes: [0.5, 0.5],
            frequencies: [2, 4],
            phases: [0, 0],
            twist_frequencies: [1/4, 1/2],
            half_height: 2,
            waves: [new Sine(), new Sine()],
            trace_length: 8000,
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
                phases: [0, 0],
                show_offset: false
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

    make_oscillators(parameters, offsets, index) {
        return offsets.map((offset) => {
            return new Oscillator({
                parent: offset.to_joint('translate'),
                amplitude: parameters.amplitudes[index],
                phase: parameters.phases[index],
                direction: new Vector3(0, 1, 0),
                frequency: parameters.frequencies[index],
                wave: parameters.waves[index],
            });
        });
    }

    make_centroids(origin, top_oscs, bottom_oscs) {
        return top_oscs.map((top_osc, i) => {
            const bottom_osc = bottom_oscs[i];
            return new Centroid({
                points: [
                    top_osc.to_joint('translate_wave'), 
                    bottom_osc.to_joint('translate_wave')
                ],
                origin: origin.to_joint('translate'),
                weights: [1, 1]
            });
        });
    }
    
    make_traces(parameters, origin, centroids) {
        return centroids.map((centroid) => {
            return new Trace({
                source: centroid.to_joint('translate'),
                origin: origin.to_joint('translate'),
                num_points: parameters.trace_length,
            });
        });
    }

    init(parameters) {
        const origin = new Point({
            parent: parameters.parent,
            offset: Vector3.Zero(),
        });

        const top = new Point({
            parent: origin.to_joint('translate'),
            offset: new Vector3(0, parameters.half_height, 0),
        });
        const bottom = new Point({
            parent: origin.to_joint('translate'),
            offset: new Vector3(0, -parameters.half_height, 0),
        });
        
        const [top_twist, bottom_twist] = this.make_twists(
            parameters, [top, bottom]);

        const top_offsets = this.make_offsets(parameters, top_twist);
        const bottom_offsets = this.make_offsets(parameters, bottom_twist);

        const top_oscs = this.make_oscillators(parameters, top_offsets, 0);
        const bottom_oscs = this.make_oscillators(
            parameters, bottom_offsets, 1);

        const centroids = this.make_centroids(origin, top_oscs, bottom_oscs);
        const traces = this.make_traces(parameters, origin, centroids);

        this.add_part(origin);
        this.add_parts([top, bottom]);
        this.add_parts([top_twist, bottom_twist]);
        this.add_parts(top_offsets);
        this.add_parts(bottom_offsets);
        this.add_parts(top_oscs);
        this.add_parts(bottom_oscs);
        this.add_parts(centroids);
        this.add_parts(traces);

        return origin;
    }
}
