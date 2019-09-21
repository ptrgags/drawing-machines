import Renderer from './Renderer';
import GearTrain from './machines/GearTrain';
import AverageBox from './machines/AverageBox';

const avg_box = new AverageBox();
const gear_train = new GearTrain();

const renderer = new Renderer();
renderer.add_machines([
    avg_box,
    gear_train
]);
renderer.start();
