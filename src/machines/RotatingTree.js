import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';

export default class RotatingTree extends Machine {
    get default_parameters() {
        return {
            trace_length: 100,
            height: 3,
            radii: [0, 1.25, 1.5, 2],
            angular_frequencies: [0, 0.5, 1, 1.5],
        }
    }

    add_node(parameters, root, parent, height) {
        if (height === 0) {
            const trace = new Trace({
                source: parent.to_joint('translate'),
                origin: root.to_joint('translate'),
                trace_length: parameters.trace_length,
            });
            this.add_part(trace);
            return;
        }

        const freq = parameters.angular_frequencies[height];
        const radius = parameters.radii[height];

        const left = new RotatingSphere({
            parent: parent.to_joint('translate'),
            axes: [new Vector3(0, 1, 0)],
            angular_frequencies: [freq],
            radius,
        });
        this.add_part(left);

        const right = new RotatingSphere({
            parent: parent.to_joint('translate'),
            axes: [new Vector3(0, 1, 0)],
            angular_frequencies: [-freq],
            radius,
        });
        this.add_part(right);

        this.add_node(parameters, root, left, height - 1);
        this.add_node(parameters, root, right, height - 1);
    }

    init(parameters) {
        const origin = new Point();
        this.add_node(parameters, origin, origin, parameters.height);

        this.add_part(origin);

        return origin;
    }
}
