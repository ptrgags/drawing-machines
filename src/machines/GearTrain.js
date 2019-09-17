import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';

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
            camera_offset: new Vector3(0, 0, 0)
        }
    }

    init(parameters) {
        const origin = new Point({
            offset: parameters.camera_offset,
            show_offset: true
        });
        this.add_part(origin);

        return origin;
    }
}
