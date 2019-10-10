import { Vector3 } from "@babylonjs/core/Maths/math";

import PartViewer from '../machines/PartViewer';
import FourierSeries3D from '../machines/FourierSeries3D';
import CentroidViewer from '../machines/CentroidViewer';
import AverageBox from '../machines/AverageBox';
import CenteredTrochoidChain from '../machines/CenteredTrochoidChain';
import CornerTwister from '../machines/CornerTwister';
import RogueTurntable from '../machines/RogueTurntable';

import RotatingEpitrochoid from '../machines/RotatingEpitrochoid';
import PaperShaker from '../machines/PaperShaker';
import CentroidOfOrbits from '../machines/CentroidOfOrbits';
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

import XYZOscillator from '../parts/XYZOscillator';
import RotatingSphere from '../parts/RotatingSphere';
import CenteredTrochoid from '../parts/CenteredTrochoid';

import Prefab from '../parts/Prefab';
import Fourier from '../waves/Fourier';
import Sine from '../waves/Sine';
import Square from '../waves/Square';

const nested_trochoids = new CenteredTrochoidChain();
const corner_twister = new CornerTwister();
const turntable = new RogueTurntable();
const rotating_epitrochoid = new RotatingEpitrochoid();
const paper_shaker = new PaperShaker();
const centroid_of_orbits = new CentroidOfOrbits();
/*
const spiral_spheres = new CentroidViewer({
    parts: [
        new RotatingSphere(),
        new RotatingSphere(),
    ]
});
*/

const rose_curves = new RoseCurves();
const tree = new RotatingTree();
const epitrochoid_tree = new FractalCenteredEpitrochoids();
const osc_sphere = new OscillatorOnASphere();
const trochoid_car = new CenteredTrochoidCar();
const double_trochoid = new DoubleCentroidTrochoid();

const triple_osc_throb = new ThrobbingTripleOsc();
const sliding_turntable = new SlidingTurntable();
const springy_discs = new SpringyDiscs();
const fractal_rotation = new FractalRotation();

const machines = [
    fractal_rotation,
    springy_discs,
    sliding_turntable,
    triple_osc_throb,
    double_trochoid,
    trochoid_car,
    osc_sphere,
    epitrochoid_tree,
    tree,
    rose_curves,
    //spiral_spheres,
    centroid_of_orbits,
    paper_shaker,
    rotating_epitrochoid,
    turntable,
    corner_twister,
    nested_trochoids,
];

export {machines}
