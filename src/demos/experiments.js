import { Vector3 } from "@babylonjs/core/Maths/math";

import PartViewer from '../machines/PartViewer';
import FourierSeries3D from '../machines/FourierSeries3D';
import ThrobbingSphere from '../machines/ThrobbingSphere';
import CentroidViewer from '../machines/CentroidViewer';
import CenteredTrochoidChain from '../machines/CenteredTrochoidChain';
import XYZOscillator from '../parts/XYZOscillator';
import RotatingSphere from '../parts/RotatingSphere';
import CenteredTrochoid from '../parts/CenteredTrochoid';
import Prefab from '../parts/Prefab';
import Fourier from '../waves/Fourier';
import Sine from '../waves/Sine';
import Square from '../waves/Square';

const fourier = new Fourier({
    amplitudes: [1, 1/2, 1/4, 1/8],
    frequencies: [1, 2, 3, 4]
});
const fourier2 = new Fourier({
    amplitudes: [1, 2, 4, 8],
    frequencies: [1, 2, 3, 4]
});
const fourier3 = new Fourier({
    amplitudes: [1, 1/3, 1/5, 1/7],
    frequencies: [1, 3, 5, 7]
});

const fourier_osc = new PartViewer({
    part: new XYZOscillator({
        waves: [fourier, new Square(), fourier2],
        amplitudes: new Vector3(3, 1, 2),
        frequencies: new Vector3(1, 100, 1),
    }),
    trace_joint: 'translate_wave',
    time_step: 1/1000
});
const fourier_ring = new PartViewer({
    part: new XYZOscillator({
        waves: [new Sine(), fourier3, new Sine()],
        amplitudes: new Vector3(1, 1, 1),
        frequencies: new Vector3(1, 4, 1),
    }),
    trace_joint: 'translate_wave',
    time_step: 1/1000
});
const osc3 = new PartViewer({
    part: new XYZOscillator(),
    trace_joint: 'translate_wave',
    trace_length: 2000
});
const sphere_spirals = new PartViewer({
    part: new RotatingSphere(),
    trace_length: 4000
});

const box_vs_spirals = new CentroidViewer({
    parts: [
        // TODO: Wrap with a trace
        new RotatingSphere(),
        new Prefab({
            machine: new AverageBox()
        }),
    ],
    joint_names: [
        'translate',
        'centroid.translate',
    ],
    offsets: [
        new Vector3(10, 0, 0),
        new Vector3(-10, 0, 0),
    ],
    weights: [1, 1],
    trace_length: 10000
});

const throb = new ThrobbingSphere();

const fourier_discs = new FourierSeries3D();
const fourier_spheres = new FourierSeries3D({
    axes: [
        new Vector3(0, 1, 0),
        new Vector3(0, 0, 1),
        new Vector3(0, 1, 0),
        new Vector3(0, 0, 1),
    ],
    angular_frequencies: [13, 19, 23, 43],
    trace_length: 10000,
    time_step: 1/1000,
});

const torus_knot = new FourierSeries3D({
    axes: [
        new Vector3(0, 1, 0),
        new Vector3(0, 0, 1)
    ],
    amplitudes: [2, 0.5],
    angular_frequencies: [1, 100],
    phases: [0, 0],
    time_step: 1/400,
    trace_length: 10000,
});

const torus_knot2 = new FourierSeries3D({
    axes: [
        new Vector3(0, 1, 0),
        new Vector3(0, 0, 1)
    ],
    amplitudes: [1, 0.5],
    angular_frequencies: [23, 37],
    phases: [0, 0],
    time_step: 1/200,
    trace_length: 2000,
});

const nested_trochoids = new CenteredTrochoidChain();

const machines = [
    nested_trochoids,
    torus_knot2,
    torus_knot,
    fourier_spheres,
    fourier_discs,
    box_vs_spirals,
    fourier_osc,
    throb,
    fourier_ring,
    sphere_spirals,
    osc3,
];

export {machines}
