import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Wheel from '../parts/Wheel';
import DrivenWheel from '../parts/DrivenWheel';

/**
 * Simple gear train with a sliding arm connecting two of the gears. The
 * arm has a pen attached.
 */
export default class GearTrain extends Machine {
    get default_parameters() {
        return {
            // Radii of each gear
            radii: [1, 2, 3],
            // Half the thickness of all gears
            half_height: 0.1,
            // Initial angles of each gear
            initial_angles: [0, 0, 0],
            // Angle of the line connecting a previous gear to the next gear
            contact_angles: [Math.PI / 4, -Math.PI / 4],
            // Angular velocity of the input gear
            angular_velocity: 1,
            // Which gears are connected by the arm
            arm_gears: [0, 2],
            // Offset of pen relative to the arm's local coordinates
            pen_offset: new Vector3(1, 0, -2),
            // Offset of the root coordinate system 
            camera_offset: new Vector3(0, 0.5, 0)
        }
    }

    make_gears(parameters, origin) {
        const gears = [];

        const half_height = parameters.half_height;
        const radii = parameters.radii;

        for (let i = 0; i < radii.length; i++) {
            const radius = radii[i];
            const initial_angle = parameters.initial_angles[i];

            if (i === 0) {
                const input_gear = new Wheel({
                    parent: origin.to_joint('translate'),
                    radius: radius,
                    offset: Vector3.Zero(),
                    initial_angle: initial_angle,
                    half_height: half_height,
                    angular_velocity: parameters.angular_velocity
                });
                gears.push(input_gear);
            } else {
                const driven_gear = new DrivenWheel({
                    parent: gears[i - 1].to_joint('translate'),
                    radius: radius,
                    offset_angle: parameters.contact_angles[i - 1],
                    initial_angle: initial_angle,
                    half_height: half_height,
                });
                gears.push(driven_gear);
            }
        }

        return gears;
    }

    init(parameters) {
        const origin = new Point({
            offset: parameters.camera_offset,
            show_offset: true
        });

        const gears = this.make_gears(parameters, origin);

        this.add_part(origin);
        for (let gear of gears) {
            this.add_part(gear);
        }

        return origin;
    }
}
