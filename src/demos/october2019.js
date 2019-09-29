import { Vector3 } from "@babylonjs/core/Maths/math";
import GearTrain from '../machines/GearTrain';

function oct01() {
    return new GearTrain({
        angular_velocity: 2,
        half_height: 0.1,
        radii: [2, 5, 3],
        phases: [0, 0, 0],
        contact_angles: [4, 2, 3].map(x => x * Math.PI / 4),
        arm_gears: [0, 2],
        arm_offsets: [new Vector3(1, 0.2, 0), new Vector3(2, 0.2, 1)],
        pen_offset: new Vector3(4, 0, 3),
        trace_length: 4000
    });
}

const machines = [
    oct01()
];

export {machines}

