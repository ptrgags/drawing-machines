import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';
import CenteredTrochoid from '../parts/CenteredTrochoid';
import WavePalette from '../palettes/WavePalette';

export default class RotatingEpitrochoid extends Machine {
    get default_parameters() {
        return {
            trace_length: 8000,
            palette: new WavePalette,
            rotate_frequency: 0.6,
            trochoid_frequency: 3,
            frame_radius: 1,
            wheel_radius: 0.1,
            show_radii: true,
        }
    }

    init(parameters) {
        const origin = new Point();

        const rotation = new RotatingSphere({
            parent: origin.to_joint('translate'),
            axes: [
                new Vector3(0, 1, 0)
            ],
            angular_frequencies: [
                parameters.rotate_frequency,
            ],
        });

        const trochoid = new CenteredTrochoid({
            parent: rotation.to_joint('translate'),
            angular_frequency: parameters.trochoid_frequency,
            show_radii: parameters.show_radii,
            frame_radius: parameters.frame_radius,
            wheel_radius: parameters.wheel_radius,
        });

        const trace = new Trace({
            source: trochoid.to_joint('translate_offset'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length,
            palette: parameters.palette,
        });

        this.add_part(origin);
        this.add_part(rotation);
        this.add_part(trochoid);
        this.add_part(trace);

        return origin;
    }
}
