import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import RotatingSphere from '../parts/RotatingSphere';
import Trace from '../parts/Trace';
import WavePalette from '../palettes/WavePalette';

export default class FourierSeries3D extends Machine {
    get default_parameters() {
        return {
            parent: undefined,
            amplitudes: [4, 3, 2, 1],
            angular_frequencies: [1, 1.25, 3.25, 4.5].map(x => x * Math.PI / 4),
            phases: [0, 0, 0, 0],
            axes: [
                new Vector3(0, 1, 0),
                new Vector3(0, 1, 0),
                new Vector3(0, 1, 0),
                new Vector3(0, 1, 0),
            ],
            trace_length: 1000,
            time_step: 1/100,
            palette: new WavePalette(),
            palette_freq: 2,
        }
    }

    get time_step() {
        return this._time_step;
    }

    make_spheres(parameters, origin) {
        const spheres = [];
        let current_parent = origin;
        for (let i = 0; i < parameters.amplitudes.length; i++) {
            const sphere = new RotatingSphere({
                radius: parameters.amplitudes[i],
                axes: [parameters.axes[i]],
                angular_frequencies: [parameters.angular_frequencies[i]],
                phases: [parameters.phases[i]],
                parent: current_parent.to_joint('translate')
            });
            spheres.push(sphere);
            current_parent = sphere;
        }
        return spheres;
    }

    init(parameters) { 
        this._time_step = parameters.time_step;
        const origin = new Point({
            parent: parameters.parent,
            offset: Vector3.Zero(),
            show_offset: false
        });
        const spheres = this.make_spheres(parameters, origin);
        const last_sphere = spheres[spheres.length - 1];

        const trace = new Trace({ 
            source: last_sphere.to_joint('translate'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length,
            palette: parameters.palette,
            palette_freq: parameters.palette_freq
        });

        this.add_part(origin);
        this.add_parts(spheres);
        this.add_part(trace);

        return origin;
    }
}
