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
            parent: undefined,
            // Machine class that this prefab represents (required)
            machine: undefined,
        }
    }

    init(parameters) {
        super.init(parameters);
        this.machine = required(parameters, 'machine');
        this.machine.root_part.parent = parameters.parent;
    }

    change_parent(parent) {
        this.parent = parent;
        this.machine.root_part.parent = parent;
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
        const [part_label, ...rest]  = node_name.split('.');
        const part_node = rest.join('.');

        const part = this.machine.find_part(part_label);
        return part.to_joint(part_node);
    }
}
