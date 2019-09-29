import { Vector3 } from "@babylonjs/core/Maths/math";
import GearTrain from '../machines/GearTrain';
import { metadata } from './metadata_october2019';

function oct01() {
    return new GearTrain({
        angular_velocity: 4,
        half_height: 0.1,
        radii: [2, 5, 3, 7],
        phases: [0, 0, 0, 0],
        contact_angles: [4, 2, 3].map(x => x * Math.PI / 4),
        arm_gears: [0, 3],
        arm_offsets: [new Vector3(1, 0.2, 0.1), new Vector3(0, 0.2, 1.5)],
        pen_offset: new Vector3(4, 0, 4),
        trace_length: 4000
    });
}

const machines = [
    oct01()
];

export {machines, metadata}

