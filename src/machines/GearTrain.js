import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Wheel from '../parts/Wheel';
import DrivenWheel from '../parts/DrivenWheel';
import Arm from '../parts/Arm';
import Trace from '../parts/Trace';

/**
 * Simple gear train with a sliding arm connecting two of the gears. The
 * arm has a pen attached. The pen draws on a rotating turntable on a
 * third gear.
 */
export default class GearTrain extends Machine {
    get default_parameters() {
        return {
            // Parent joint to attach to (optional)
            parent: undefined,
            // Radii of each gear
            radii: [1, 2, 3, 5],
            // Half the thickness of all gears
            half_height: 0.1,
            // Initial angles of each gear
            phases: [0, 0, 0, 0],
            // Angle of the line connecting a previous gear to the next gear
            contact_angles: [Math.PI / 4, -Math.PI / 4, 0],
            // Angular velocity of the input gear
            angular_velocity: 5,
            // Which gears are connected by the arm
            arm_gears: [0, 3],
            // Offsets of the endpoints of the arm with respect to the 
            // gear center before rotation
            arm_offsets: [new Vector3(1, 0.2, 0), new Vector3(2, 0.2, 1)],
            // Offset of pen relative to the arm's local coordinates
            pen_offset: new Vector3(3, 0, 2.5),
            // How many points in the trace
            trace_length: 1000,
        }
    }

    make_gears(parameters, origin) {
        const gears = [];

        const half_height = parameters.half_height;
        const radii = parameters.radii;

        for (let i = 0; i < radii.length; i++) {
            const radius = radii[i];
            const phase = parameters.phases[i];

            if (i === 0) {
                const input_gear = new Wheel({
                    parent: origin.to_joint('translate'),
                    radius: radius,
                    offset: Vector3.Zero(),
                    initial_angle: phase,
                    half_height: half_height,
                    angular_velocity: parameters.angular_velocity
                });
                gears.push(input_gear);
            } else {
                const driven_gear = new DrivenWheel({
                    parent: gears[i - 1].to_joint('translate'),
                    radius: radius,
                    offset_angle: parameters.contact_angles[i - 1],
                    initial_angle: phase,
                    half_height: half_height,
                });
                gears.push(driven_gear);
            }
        }
        return gears;
    }

    make_arm_points(parameters, gears) {
        const [start_idx, end_idx] = parameters.arm_gears;
        const [start_offset, end_offset] = parameters.arm_offsets;
        const start_gear = gears[start_idx];
        const end_gear = gears[end_idx];

        const start_point = new Point({
            parent: start_gear.to_joint('rotate'),
            offset: start_offset,
            show_offset: true
        });

        const end_point = new Point({
            parent: end_gear.to_joint('rotate'),
            offset: end_offset,
            show_offset: true
        });

        return [start_point, end_point];
    }

    init(parameters) {
        const origin = new Point();

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

        this.add_part(origin);
        this.add_parts(gears);
        this.add_parts(arm_points);
        this.add_part(arm);
        this.add_part(pen);
        this.add_part(trace);

        return origin;
    }
}
