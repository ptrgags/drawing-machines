import { Vector3 } from "@babylonjs/core/Maths/math";

import GearTrain from '../machines/GearTrain';
import AverageBox from '../machines/AverageBox';
import PartViewer from '../machines/PartViewer';
import XYZOscillator from '../parts/XYZOscillator';
import RotatingSphere from '../parts/RotatingSphere';
import Sine from '../waves/Sine';
import Square from '../waves/Square';
import Fourier from '../waves/Fourier';

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

function oct03() {
    return new PartViewer({
        part: new XYZOscillator({
            amplitudes: new Vector3(0.5, 6, 0.5),
            frequencies: new Vector3(4, 0.05, 4),
            phases: new Vector3(0, 0, Math.PI / 2),
            waves: [new Sine(), new Sine(), new Sine()]
        }),
        trace_joint: 'translate_wave',
        trace_length: 2000,
        time_step: 1/100
    });
}

function oct04() {
    const fourier = new Fourier({
        amplitudes: [1, 1/2, 1/4, 1/8],
        frequencies: [1, 2, 3, 4]
    });
    const fourier2 = new Fourier({
        amplitudes: [1, 2, 4, 8],
        frequencies: [1, 2, 3, 4]
    });
    return new PartViewer({
        part: new XYZOscillator({
            amplitudes: new Vector3(3, 1, 2),
            frequencies: new Vector3(1, 100, 1),
            phases: new Vector3(0, 0, Math.PI / 2),
            waves: [fourier, new Square(), fourier2],
        }),
        trace_joint: 'translate_wave',
        trace_length: 1000,
        time_step: 1/1000
    });
}

function oct05() {
    return new PartViewer({
        part: new RotatingSphere({
            radius: 2,
            axes: [
                new Vector3(0, 1, 0),
                new Vector3(0, 0, 1)
            ],
            angular_frequencies: [
                0.1,
                2,
            ],
            phases: [
                0,
                0
            ],
        }),
        trace_length: 4000
    });
}

function oct06() {
    const fourier = new Fourier({
        amplitudes: [1, 1/3, 1/5, 1/7],
        frequencies: [1, 3, 5, 7]
    });
    return new PartViewer({
        part: new XYZOscillator({
            amplitudes: new Vector3(1, 1, 1),
            frequencies: new Vector3(1, 4, 1),
            phases: new Vector3(0, 0, Math.PI / 2),
            waves: [new Sine(), fourier, new Sine()],
        }),
        trace_joint: 'translate_wave',
        time_step: 1/1000
    });
}

const machines = [
    oct06(),
    oct05(),
    oct04(),
    oct03(),
    oct02(),
    oct01(),
];

export {machines, metadata}
