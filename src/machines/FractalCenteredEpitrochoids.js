import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import CenteredTrochoid from '../parts/CenteredTrochoid';

export default class FractalCenteredEpitrochoids extends Machine {
    get default_parameters() {
        return {
            trace_length: 8000,
            height: 2,
            angular_frequencies: [0, 0.1, 0.2, 0.3],
            radii: [0, 0.25, 0.5, 1],
        }
    }

    static get ANGLES() {
        return [0, 1, 2, 3].map(x => Math.PI / 2 * x);
    }

    make_tree(parameters, root, parent, height) {
        if (height === 0) {
            const trace = new Trace({
                source: parent.to_joint('translate_offset'),
                origin: root.to_joint('translate'),
                num_points: parameters.trace_length,
            });
            this.add_part(trace);
            return;
        }

        const joint = parent instanceof Point ? 'translate' : 'rotate_wheel';
        const radii = parameters.radii;

        const trochoids = FractalCenteredEpitrochoids.ANGLES.map(angle => {
            return new CenteredTrochoid({
                parent: parent.to_joint(joint),
                angular_frequency: parameters.angular_frequencies[height],
                frame_phase: angle,
                frame_radius: radii[height],
                wheel_radius: radii[height + 1],
                wheel_phase: 0,
                show_radii: true,
            });
        });

        this.add_parts(trochoids);

        for (const trochoid of trochoids) {
            this.make_tree(parameters, root, trochoid, height - 1);
        }
    }

    init(parameters) {
        const origin = new Point();
        this.make_tree(parameters, origin, origin, parameters.height);
        this.add_part(origin);
        return origin;
    }
}
