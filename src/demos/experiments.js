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
import OscPyramid from '../machines/OscPyramid';
import OscillatorRing from '../machines/OscillatorRing';

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
const spiral_spheres = new CentroidViewer({
    parts: [
        new Prefab({
            machine: new PartViewer({
                part: new RotatingSphere({
                    radius: 2,
                    start_direction: new Vector3(-1, 0, 0),
                    axes: [
                        new Vector3(0, 1, 0),
                        new Vector3(0, 0, 1)
                    ],
                    angular_frequencies: [
                        13,
                        11,
                    ],
                }),
                trace_length: 1000,
                palette_freq: 1
            })
        }),
        new Prefab({
            machine: new PartViewer({
                part: new RotatingSphere({
                    radius: 2,
                    axes: [
                        new Vector3(0, 1, 0),
                        new Vector3(0, 0, 1)
                    ],
                    angular_frequencies: [
                        5,
                        3,
                    ],
                }),
                trace_length: 1000,
                palette_freq: 1
            })
        }),
    ],
    joint_names: [
        'part.translate',
        'part.translate',
    ],
    offsets: [
        new Vector3(8, 0, 0),
        new Vector3(-8, 0, 0),
    ],
    weights: [1, 1],
    trace_length: 5000
});

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
    centroid_of_orbits,
    paper_shaker,
    rotating_epitrochoid,
    turntable,
    corner_twister,
    nested_trochoids,
];

export {machines}
