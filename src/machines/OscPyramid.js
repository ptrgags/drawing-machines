import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import Oscillator from '../parts/Oscillator';
import Centroid from '../parts/Centroid';
import RotatingSphere from '../parts/RotatingSphere';

export default class OscPyramid extends Machine {
    get default_parameters() {
        return {
            trace_length: 2000,
            height: 3,
            amps: [0, 1, 0.5, 0.25],
            freqs: [0, 1, 0.5, 0.25],
            rotate_freq: 2,
            rotate_radius: 5,
        }
    }

    static get OFFSETS() {
        return [
            new Vector3(1, -2, 1),
            new Vector3(-1, -2, 1),
            new Vector3(1, -2, -1),
            new Vector3(-1, -2, -1),
        ]
    }

    make_tree(parameters, root, parent, height) {
        if (height === 0) {
            return [parent];
        }

        const amp = parameters.amps[height];
        const freq = parameters.freqs[height];

        const oscs = OscPyramid.OFFSETS.map(offset => {
            return new Oscillator({
                parent: parent.to_joint('translate_wave'),
                amplitude: amp,
                frequency: freq,
                offset,
            });
        });

        this.add_parts(oscs);

        const results = [parent]
  
        const child_results = oscs.map(osc => {
            return this.make_tree(parameters, root, osc, height - 1);
        });

        return results.concat(...child_results);
    }

    init(parameters) {
        const origin = new Point();
        const root = new Oscillator({
            parent: origin.to_joint('translate')
        });

        const oscs = this.make_tree(parameters, root, root, parameters.height);
        const centroid = new Centroid({
            points: oscs.map(x => x.to_joint('translate_wave')),
            weights: oscs.map(x => 1),
            origin: origin.to_joint('translate')
        });

        const sphere = new RotatingSphere({
            parent: centroid.to_joint('translate'),
            radius: parameters.rotate_radius,
            axes: [
                new Vector3(0, 1, 0)
            ],
            angular_frequencies: [
                parameters.rotate_freq,
            ]
        });

        const trace = new Trace({
            source: sphere.to_joint('translate'),
            origin: origin.to_joint('translate'),
            trace_length: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(root);
        this.add_part(centroid);
        this.add_part(sphere);
        this.add_part(trace);

        return origin;
    }
}
