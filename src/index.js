import Renderer from './Renderer';
import Machine from './machines/Machine';

const dummy_machine = new Machine();

const renderer = new Renderer();
renderer.add_machines([
    dummy_machine
]);
renderer.start();
