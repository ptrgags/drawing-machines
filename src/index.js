import Renderer from './Renderer';
import GearTrain from './machines/GearTrain';
import AverageBox from './machines/AverageBox';
import PartViewer from './machines/PartViewer';
import DoubleAverageBox from './machines/DoubleAverageBox';
import XYZOscillator from './parts/XYZOscillator';
import RotatingSphere from './parts/RotatingSphere';

const osc3 = new PartViewer({
    part_class: XYZOscillator,
    trace_joint: 'translate_wave',
    trace_length: 2000
});
const sphere_spirals = new PartViewer({
    part_class: RotatingSphere,
    trace_length: 4000
});
const avg_box = new AverageBox();
const double_avg_box = new DoubleAverageBox();
const gear_train = new GearTrain();

const renderer = new Renderer();
renderer.add_machines([
    gear_train,
    sphere_spirals,
    double_avg_box,
    avg_box,
    osc3,
]);
renderer.start();
