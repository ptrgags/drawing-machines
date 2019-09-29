import Renderer from './Renderer';

/**
 * Which mode to use. "experiments" is a working space for future machines.
 * drawing machines. "october2019" is the environment used for generating
 * the polished machines used in my Inktober alternative challenge.
 * 
 * Unlike most projects, the master branch here includes experimental code.
 * This is because I need to edit code quickly in order to publish something
 * each day. The gh-pages branch is where the "production" code lives.
 */
const ENVIRONMENT = 'october2019';

/**
 * Once the machines have been loaded, set up the Renderer and start the
 * main loop.
 */
function start(machine_module) {
    const machines = machine_module.machines;
    const show_buttons = machines.length > 1;
    const renderer = new Renderer(show_buttons);
    renderer.add_machines(machines);
    renderer.start(); 
}

// Launch the program!
import(`./demos/${ENVIRONMENT}`)
    .then(start)
    .catch(console.error);

