import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class Point extends Part {
    get default_parameters() {
        return {
            offset: Vector3.Zero(),
            parent: undefined,
            show_offset: false
        };
    }

    init(parameters) {
        super.init(parameters);
        this.offset = parameters.offset;
        this.show_offset = parameters.show_offset;
    }

    get part_type() {
        return 'point';
    }

    get transform_names() {
        return ['translate'];
    }

    get primitive_names() {
        return ['line'];
    }

    make_line(scene) {
        return MeshBuilder.CreateLines(`${this.id}-line`, {
            points: [
                Vector3.Zero(),
                this.offset.negate()
            ]
        }, scene);
    }

    build(scene) {
        const translate = new TransformNode(`${this.id}-translate`, scene);
        translate.position = this.offset;
        if (this.parent !== undefined) {
            translate.parent = this.parent.node;
        }
        this.translate = translate;

        if (this.show_offset) {
            const line = this.make_line(scene);
            line.parent = translate;
            this.line = line;
        }

        return translate;
    }
}
