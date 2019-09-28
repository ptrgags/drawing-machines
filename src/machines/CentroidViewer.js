import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import { required } from '../util';

export default class CentroidViewer extends Machine {
    get default_parameters() {
        return {
            machine_classes: [],
            machine_parameters: [],
            joint_names: [],
            offsets: [],
            centroid_trace_length: 1000
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

    make_prefabs(parameters, offsets) {
        const prefabs = [];
        for (let i = 0; i < parameters.machine_classes; i++) {
            const prefab = new Prefab({
                machine_class: parameters.machine_classes[i],
                machine_parameters: parameters.machine_parameters[i],
                parent: offsets[i].to_joint('translate'),
            });
            prefabs.push(prefab);
        }
        return prefabs;
    }

    make_centroid(parameters, prefabs, origin) {
        const names = parameters.joint_names;
        const joints = prefabs.map((prefab, i) => prefab.to_joint(names[i]));
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
        const prefabs = this.make_prefabs(parameters, offsets);
        const centroid = this.make_centroid(parameters, prefabs, origin);
        const trace = new Trace({ 
            source: centroid.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_parts(offsets);
        this.add_parts(prefabs);
        this.add_part(centroid);
        this.add_part(trace);

        return origin;
    }
}
