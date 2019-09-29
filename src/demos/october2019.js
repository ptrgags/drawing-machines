import { Vector3 } from "@babylonjs/core/Maths/math";

import GearTrain from '../machines/GearTrain';
import AverageBox from '../machines/AverageBox';

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

function oct02() {
    return new AverageBox({
            size: new Vector3(4, 4, 4),
            frequencies: [
                0.1,
                0.2,
                0.3,
                0.4,
                0.5,
                0.6,
                0.7,
                0.8,
                0.9,
                1.0,
                1.1,
                1.2,
            ],
            weights: [1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1],
            phases: [
                0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2
            ].map(x => x * Math.PI / 4),
            trace_length: 750,
    });
}

const machines = [
    oct02(),
    oct01()
];

export {machines, metadata}

