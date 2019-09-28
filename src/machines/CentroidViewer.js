import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Centroid from '../parts/Centroid';
import Trace from '../parts/Trace';
import { required } from '../util';

/**
 * A CentroidViewer is like a PartViewer, except it allows for multiple
 * parts and adds a centroid to combine the results
 */
export default class CentroidViewer extends Machine {
    get default_parameters() {
        return {
            parts: [],
            joint_names: [],
            offsets: [],
            weights: [],
            trace_length: 1000,
        };
    }

    make_offsets(parameters, origin) {
        const points = [];
        for (let offset of parameters.offsets) {
            const point = new Point({
                parent: origin.to_joint('translate'),
                offset: offset,
            });
            points.push(point);
        }
        return points;
    }

    make_parts(parameters, offsets) {
        const parts = [];
        for (let i = 0; i < parameters.parts.length; i++) {
            const part = parameters.parts[i];
            part.change_parent(offsets[i].to_joint('translate'));
            parts.push(part);
        }
        return parts;
    }

    make_centroid(parameters, parts, origin) {
        const names = parameters.joint_names;
        const joints = parts.map((part, i) => part.to_joint(names[i]));
        return new Centroid({
            points: joints,
            weights: parameters.weights,
            origin: origin.to_joint('translate'),
        });
    }

    init(parameters) {
        const origin = new Point({
            show_offset: true
        });
        const offsets = this.make_offsets(parameters, origin);
        const parts = this.make_parts(parameters, offsets);
        const centroid = this.make_centroid(parameters, parts, origin);
        const trace = new Trace({ 
            source: centroid.to_joint('translate'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_parts(offsets);
        this.add_parts(parts);
        this.add_part(centroid);
        this.add_part(trace);

        return origin;
    }
}
