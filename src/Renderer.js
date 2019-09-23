import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';

export default class Renderer {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.engine = new Engine(this.canvas);
        this.scene = new Scene(this.engine);

        this.camera = new ArcRotateCamera(
            'camera', 0, Math.PI / 3, 10, Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true); 

        this.light = new HemisphericLight(
            'light', new Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;

        this.machines = [];
        this.active_machine = 0;
        this.t = 0;

        this.machine_primitive = undefined;
    }

    add_machines(new_machines) {
        this.machines.push(...new_machines);
    }

    get current_machine() {
        return this.machines[this.active_machine];
    }

    on_frame() {
        const dt = this.current_machine.time_step;
        this.t += dt;

        if (this.current_machine !== undefined) {
            this.current_machine.update(this.t);
        }
    }

    build() {
        if (this.current_machine === undefined) {
            return;
        }

        if (this.machine_primitive !== undefined) {
            this.machine_primitive.dispose();
        }
        
        this.machine_primitive = this.current_machine.build(this.scene);  
    }

    start() {
        this.build();
        this.scene.registerAfterRender(() => this.on_frame());

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
