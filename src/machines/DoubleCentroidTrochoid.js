import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import CenteredTrochoid from '../parts/CenteredTrochoid';
import WavePalette from '../palettes/WavePalette';

export default class DoubleCentroidTrochoid extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
            frame_radius: 1.5,
            wheel_radius: 0.3,
            palette: new WavePalette(),
        }
    }

    get time_step() {
        return 1 / 100;
    }

    init(parameters) {
        const origin = new Point();
        const epi = new CenteredTrochoid({
            parent: origin.to_joint('translate'),
            wheel_radius: parameters.wheel_radius
        });
        const hypo = new CenteredTrochoid({
            parent: origin.to_joint('translate'),
            wheel_radius: -parameters.wheel_radius
        });

        const epi_trace = new Trace({
            source: epi.to_joint('translate_offset'),
            origin: origin.to_joint('translate'),
            trace_length: parameters.trace_length,
            palette: parameters.palette
        });

        const hypo_trace = new Trace({
            source: hypo.to_joint('translate_offset'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length,
            palette: parameters.palette
        });

        this.add_part(origin);
        this.add_part(epi);
        this.add_part(hypo);
        this.add_part(epi_trace);
        this.add_part(hypo_trace);

        return origin;
    }
}
