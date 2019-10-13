import { Vector3 } from "@babylonjs/core/Maths/math";

import PartViewer from '../machines/PartViewer';
import FourierSeries3D from '../machines/FourierSeries3D';
import CentroidViewer from '../machines/CentroidViewer';
import AverageBox from '../machines/AverageBox';

import RoseCurves from '../machines/RoseCurves';
import RotatingTree from '../machines/RotatingTree';
import FractalCenteredEpitrochoids from '../machines/FractalCenteredEpitrochoids';
import OscillatorOnASphere from '../machines/OscillatorOnASphere';
import CenteredTrochoidCar from '../machines/CenteredTrochoidCar';
import DoubleCentroidTrochoid from '../machines/DoubleCentroidTrochoid';
import ThrobbingTripleOsc from '../machines/ThrobbingTripleOsc';
import SlidingTurntable from '../machines/SlidingTurntable';
import SpringyDiscs from '../machines/SpringyDiscs';
import FractalRotation from '../machines/FractalRotation';
import OscPyramid from '../machines/OscPyramid';
import OscillatorRing from '../machines/OscillatorRing';

import XYZOscillator from '../parts/XYZOscillator';
import RotatingSphere from '../parts/RotatingSphere';
import CenteredTrochoid from '../parts/CenteredTrochoid';

import Prefab from '../parts/Prefab';
import Fourier from '../waves/Fourier';
import Sine from '../waves/Sine';
import Square from '../waves/Square';

const rose_curves = new RoseCurves();
const tree = new RotatingTree();
const epitrochoid_tree = new FractalCenteredEpitrochoids();
const osc_sphere = new OscillatorOnASphere();
const trochoid_car = new CenteredTrochoidCar();
const double_trochoid = new DoubleCentroidTrochoid();
const osc_ring = new OscillatorRing();

const triple_osc_throb = new ThrobbingTripleOsc();
const sliding_turntable = new SlidingTurntable();
const osc_pyramid = new OscPyramid();
const springy_discs = new SpringyDiscs();
const fractal_rotation = new FractalRotation();

const machines = [
    sliding_turntable,
    osc_sphere,
    spiral_spheres,
    osc_pyramid,
    /*
    fractal_rotation,
    springy_discs,
    */
    triple_osc_throb,
    osc_ring,
    double_trochoid,
    trochoid_car,
    /*
    epitrochoid_tree,
    */
    tree,
    rose_curves,
];

export {machines}
