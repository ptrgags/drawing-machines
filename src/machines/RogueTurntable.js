import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Wheel from '../parts/Wheel';
import RotatingSphere from '../parts/RotatingSphere';
import Trace from '../parts/Trace';

export default class RogueTurntable extends Machine {
    get default_parameters() {
        return {
            turntable_center: new Vector3(-1, 0, 0),
            turntable_angular_velocity: 3,
            turntable_radius: 3,
            arm_angular_frequency: 0.5,
            arm_center: new Vector3(2, 0.2, 1),
            arm_radius: 3,
            trace_length: 4000
        }
    }

    init(parameters) {
        const origin = new Point();
        const turntable = new Wheel({
            parent: origin.to_joint('translate'),
            offset: parameters.turntable_center,
            radius: parameters.turntable_radius,
            angular_velocity: parameters.turntable_angular_velocity,
        });
        const arm_offset = new Point({
            parent: origin.to_joint('translate'),
            offset: parameters.arm_center
        });
        const rotating_arm = new RotatingSphere({
            parent: arm_offset.to_joint('translate'),
            radius: parameters.arm_radius,
            axes: [new Vector3(0, 1, 0)],
            angular_frequencies: [parameters.arm_angular_frequency]
        });
        const trace = new Trace({
            source: rotating_arm.to_joint('translate'),
            target: turntable.to_joint('rotate'),
            origin: turntable.to_joint('rotate'),
            trace_length: parameters.trace_length
        });

        this.add_part(origin);
        this.add_part(turntable);
        this.add_part(arm_offset);
        this.add_part(rotating_arm);
        this.add_part(trace);

        /*
        const gears = this.make_gears(parameters, origin);
        const arm_points = this.make_arm_points(parameters, gears);

        const arm = new Arm({
            parents: arm_points.map(x => x.to_joint('translate')),  
        });

        const pen = new Point({
            parent: arm.to_joint('rotate'),
            offset: parameters.pen_offset,
            show_offset: true
        });

        const trace = new Trace({
            source: pen.to_joint('translate'),
            target: gears[1].to_joint('rotate'),
            origin: gears[1].to_joint('rotate'),
            num_points: parameters.trace_length
        });

        this.add_parts(gears);
        this.add_parts(arm_points);
        this.add_part(arm);
        this.add_part(pen);
        this.add_part(trace);
        */

        return origin;
    }
}
