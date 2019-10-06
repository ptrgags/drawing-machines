import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import { required } from '../util';

export default class PartViewer extends Machine {
    get default_parameters() {
        return {
            // Translation for the origin
            origin_offset: Vector3.Zero(),
            // How many points to store in the trace
            trace_length: 1000,
            // Part object to store (required)
            part: undefined,
            // What joint of the part to connect the trace to
            trace_joint: 'translate',
            // Time step
            time_step: 1 / 60,
        };
    }

    get time_step() {
        return this._time_step;
    }

    init(parameters) {
        this._time_step = parameters.time_step;

        const origin = new Point({
            offset: parameters.origin_offset,
            show_offset: false
        });

        const part = required(parameters, 'part');
        part.parent = origin.to_joint('translate');
        
        const trace = new Trace({ 
            source: part.to_joint(parameters.trace_joint),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(part, 'part');
        this.add_part(trace);

        return origin;
    } 
}
