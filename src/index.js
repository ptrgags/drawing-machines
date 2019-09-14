import Renderer from './Renderer';
import GearTrain from './machines/GearTrain';

const machine = new GearTrain();

const renderer = new Renderer();
renderer.add_machines([
    machine
]);
renderer.start();
