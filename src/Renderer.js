import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { 
    AdvancedDynamicTexture, Button, Control, TextBlock
} from '@babylonjs/gui/2D';

export default class Renderer {
    constructor(show_buttons) {
        this.canvas = document.getElementById('canvas');
        this.engine = new Engine(this.canvas);
        this.scene = new Scene(this.engine);

        this.camera = new ArcRotateCamera(
            'camera', 0, Math.PI / 3, 20, Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true); 
        this.camera.lowerRadiusLimit = 0.1;
        this.camera.wheelDeltaPercentage = 0.01;

        this.light = new HemisphericLight(
            'light', new Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;

        this.machines = [];
        this.metadata = [];
        this.active_machine = 0;
        this.t = 0;

        this.title = undefined;
        this.description = undefined;
        this.gui = this.init_gui(show_buttons);
        
        this.machine_primitive = undefined;
    }

    switch_machine(direction) {
        // JavaScript's modulo operator doesn't handle negatives correctly :(
        this.active_machine += direction;
        this.active_machine %= this.machines.length;
        this.active_machine += this.machines.length;
        this.active_machine %= this.machines.length;
        this.t = 0;
        this.camera.radius = 20;
        this.build();
    }

    init_gui(show_buttons) {
        const gui = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const title = new TextBlock();
        title.text = "Sample Machine (2019-09-29)"
        title.color = "white";
        title.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        title.fontSize = 24;
        gui.addControl(title);
        this.title = title;

        const desc = new TextBlock();
        desc.text = "blah blah blah blah asldkjfj;aslkdjv;askdfj;akdjf;akdfadf";
        desc.color = "white";
        desc.width = "500px";
        desc.textWrapping = true;
        desc.top = "26px";
        desc.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        gui.addControl(desc);
        this.description = desc;


        if (show_buttons) {
            this.init_buttons(gui);
        }
    }

    init_buttons(gui) {
        const prev = Button.CreateSimpleButton('prev', "< Previous");
        prev.width = "150px";
        prev.color = "white";
        prev.thickness = 0;
        prev.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        prev.onPointerUpObservable.add(() => this.switch_machine(-1));
        gui.addControl(prev);

        const next = Button.CreateSimpleButton('next', "Next >");
        next.width = "150px";
        next.color = "white";
        next.thickness = 0;
        next.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        next.onPointerUpObservable.add(() => this.switch_machine(1));
        gui.addControl(next);
        return gui;
    }

    set_machines(machines, metadata) {
        this.machines = machines;
        if (metadata !== undefined) {
            this.metadata = metadata;
        }
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
        this.update_metadata();
    }

    update_metadata() {
        if (this.metadata.length < 1) {
            return;
        }
        
        const current = this.metadata[this.active_machine];
        const title = `${current.title} (${current.date})`;
        this.title.text = title;
        this.description.text = current.desc;
    }

    start() {
        this.build();
        this.scene.registerAfterRender(() => this.on_frame());

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
