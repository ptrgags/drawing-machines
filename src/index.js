import { Vector3 } from "@babylonjs/core/Maths/math";

import Renderer from './Renderer';
import PartViewer from './machines/PartViewer';
import AverageBox from './machines/AverageBox';
import DoubleAverageBox from './machines/DoubleAverageBox';
import GearTrain from './machines/GearTrain';
import ThrobbingSphere from './machines/ThrobbingSphere';
//import CentroidViewer from './machines/CentroidViewer';
import XYZOscillator from './parts/XYZOscillator';
import RotatingSphere from './parts/RotatingSphere';
import Fourier from './waves/Fourier';
import Sine from './waves/Sine';
import Square from './waves/Square';

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
const avg_box = new AverageBox();
const double_avg_box = new DoubleAverageBox();
const gear_train = new GearTrain();
const throb = new ThrobbingSphere();

const renderer = new Renderer();
renderer.add_machines([
    fourier_osc,
    throb,
    fourier_ring,
    sphere_spirals,
    osc3,
    gear_train,
    double_avg_box,
    avg_box,
]);
renderer.start();
