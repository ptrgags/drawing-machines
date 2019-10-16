import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';
import WavePalette from '../palettes/WavePalette';

export default class FractalRotation extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
            height: 2,
            angular_frequencies: [0.4, 0.2, 0.1],
            radii: [1, 2, 4],
            palette: new WavePalette()
        }
    }

    static get RIGHT_VECTORS() {
        return [
            new Vector3(1, 0, 0),
            new Vector3(0, 0, 1),
            new Vector3(-1, 0, 0),
            new Vector3(0, 0, -1),
        ];
    }
    
    make_tree(parameters, root, parent, height, up, right) {
        const sphere = new RotatingSphere({
            parent: parent.to_joint('translate'),
            start_direction: right,
            axes: [up],
            radius: parameters.radii[height],
            angular_frequencies: [parameters.angular_frequencies[height]]
        });
        this.add_part(sphere);

        if (height === 0) {
            const trace = new Trace({
                source: sphere.to_joint('translate'),
                origin: root.to_joint('translate'),
                num_points: parameters.trace_length,
                palette: parameters.palette
            });
            this.add_part(trace);
            return;
        } 
        
        const back = Vector3.Cross(up, right);
        const new_up = right;
        const new_rights = [back, up, back.negate(), up.negate()];

        for (const new_right of new_rights) {
            this.make_tree(
                parameters,
                root,
                sphere,
                height - 1,
                new_up,
                new_right);
        }
    }

    init(parameters) {
        const origin = new Point();

        FractalRotation.RIGHT_VECTORS.forEach(right => {
            this.make_tree(
                parameters, 
                origin, 
                origin, 
                parameters.height, 
                new Vector3(0, 1, 0),
                right);
        });

        this.add_part(origin);

        return origin;
    }
}
