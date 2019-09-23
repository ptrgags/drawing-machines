import Renderer from './Renderer';
import GearTrain from './machines/GearTrain';
import AverageBox from './machines/AverageBox';
import SphericalSpirals from './machines/SphericalSpirals';
import TripleOsc from './machines/TripleOsc';

const osc3 = new TripleOsc();
const sphere_spirals = new SphericalSpirals();
const avg_box = new AverageBox();
const gear_train = new GearTrain();

const renderer = new Renderer();
renderer.add_machines([
    osc3,
    sphere_spirals,
    avg_box,
    gear_train
]);
renderer.start();
