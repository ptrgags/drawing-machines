import Renderer from './Renderer';
import GearTrain from './machines/GearTrain';
import AverageBox from './machines/AverageBox';
import SphericalSpirals from './machines/SphericalSpirals';
import TripleOsc from './machines/TripleOsc';
import PartViewer from './machines/PartViewer';
import DoubleAverageBox from './machines/DoubleAverageBox';
import XYZOscillator from './parts/XYZOscillator';

const osc3 = new PartViewer({
    part_class: XYZOscillator,
    trace_joint: 'translate_wave',
    trace_length: 2000
});
//const osc3 = new TripleOsc();
//const sphere_spirals = new SphericalSpirals();
const avg_box = new AverageBox();
const double_avg_box = new DoubleAverageBox();
//const gear_train = new GearTrain();

const renderer = new Renderer();
renderer.add_machines([
    double_avg_box,
    avg_box,
    osc3,
    //sphere_spirals,
    //gear_train
]);
renderer.start();
