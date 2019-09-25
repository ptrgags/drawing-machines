import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';
import { required } from '../util';

export default class Prefab extends Part {
    get default_parameters() {
        return {
            // The parent part
            parent: undefined;
            // Machine class that this prefab represents (required)
            machine_class: undefined,
            // Parameters to pass to the machine
            machine_parameters: {},
        }
    }

    init(parameters) {
        super.init(parameters);
        const MachineClass = required(parameters, 'machine_class');
        this.machine = new MachineClass(parameters.machine_parameters);
    }

    get part_type() {
        return `prefab-${this.machine.machine_type}`;
    }

    build(scene) {
        const root_primitive = this.machine.build(scene);
    }

    update(t) {
        this.machine.update(t);
    }

    to_joint(node_name) {
        const [part_id, ...rest]  = node_name.split('.');
        const part_node = rest.join('.');

        const part = this.machine.get_part(part_id);
        return part.to_joint(part_node);
    }
}
