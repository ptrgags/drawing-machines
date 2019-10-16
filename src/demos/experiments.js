import { Vector3 } from "@babylonjs/core/Maths/math";

import PartViewer from '../machines/PartViewer';
import FourierSeries3D from '../machines/FourierSeries3D';
import CentroidViewer from '../machines/CentroidViewer';
import AverageBox from '../machines/AverageBox';

import OscillatorRing from '../machines/OscillatorRing';
import OscPyramid from '../machines/OscPyramid';
import FractalCenteredEpitrochoids from '../machines/FractalCenteredEpitrochoids';
import SpringyDiscs from '../machines/SpringyDiscs';
import FractalRotation from '../machines/FractalRotation';

import Prefab from '../parts/Prefab';
import Fourier from '../waves/Fourier';
import Sine from '../waves/Sine';
import Square from '../waves/Square';

const springy_discs = new SpringyDiscs();
const fractal_rotation = new FractalRotation();

const machines = [
    fractal_rotation,
    springy_discs,
];

export {machines}
