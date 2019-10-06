import { Vector3 } from "@babylonjs/core/Maths/math";

import PartViewer from '../machines/PartViewer';
import FourierSeries3D from '../machines/FourierSeries3D';
import CentroidViewer from '../machines/CentroidViewer';
import AverageBox from '../machines/AverageBox';
import CenteredTrochoidChain from '../machines/CenteredTrochoidChain';
import CornerTwister from '../machines/CornerTwister';
import XYZOscillator from '../parts/XYZOscillator';
import RotatingSphere from '../parts/RotatingSphere';
import CenteredTrochoid from '../parts/CenteredTrochoid';
import Prefab from '../parts/Prefab';
import Fourier from '../waves/Fourier';
import Sine from '../waves/Sine';
import Square from '../waves/Square';

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
const corner_twister = new CornerTwister();

const machines = [
    corner_twister,
    nested_trochoids,
    torus_knot2,
    torus_knot,
    fourier_spheres,
];

export {machines}
