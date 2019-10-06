import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Oscillator from '../parts/Oscillator';
import Centroid from '../parts/Centroid';
import Trace from '../parts/Trace';
import Scaler from '../parts/Scaler';
import RotatingSphere from '../parts/RotatingSphere';
import WavePalette from '../palettes/WavePalette';

export default class ThrobbingSphere extends Machine {
    get default_parameters() {
        return {
            parent: undefined,
            trace_length: 4000,
            palette: new WavePalette(),
            palette_freq: 0.5
        }
    }

    init(parameters) {
        const origin = new Point({
            parent: parameters.parent,
            offset: Vector3.Zero(),
            show_offset: false
        });
        const scaler = new Scaler({
            parent: origin.to_joint('translate')
        });
        const sphere = new RotatingSphere({
            parent: scaler.to_joint('scale')
        });
        const trace = new Trace({ 
            source: sphere.to_joint('translate'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length,
            palette: parameters.palette,
            palette_freq: parameters.palette_freq
        });

        this.add_part(origin);
        this.add_part(scaler);
        this.add_part(sphere);
        this.add_part(trace);

        return origin;
    }
}
