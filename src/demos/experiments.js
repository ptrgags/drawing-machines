import { Vector3 } from "@babylonjs/core/Maths/math";

import PartViewer from '../machines/PartViewer';
import FourierSeries3D from '../machines/FourierSeries3D';
import CentroidViewer from '../machines/CentroidViewer';
import AverageBox from '../machines/AverageBox';
import CenteredTrochoidChain from '../machines/CenteredTrochoidChain';
import CornerTwister from '../machines/CornerTwister';
import RogueTurntable from '../machines/RogueTurntable';
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

const machines = [
    turntable,
    corner_twister,
    nested_trochoids,
];

export {machines}
