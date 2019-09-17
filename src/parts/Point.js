import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class Point extends Part {
    constructor(parameters) {
        super(parameters);

        // Load parameters
        this.offset = parameters.offset;
        this.parent = parameters.parent;
        this.show_offset = parameters.show_offset;

        // Reserve slots for Babylon primitives
        this.translate = undefined;
        this.line = undefined;
    }

    get part_type() {
        return 'point';
    }

    make_line(scene) {
        return MeshBuilder.CreateLines(`${this.id}-line`, {
            points: [
                new Vector3.Zero(),
                this.offset.negate()
            ]
        }, scene);
    }

    build(scene) {
        const translate = new TransformNode(`${this.id}-translate`, scene);
        translate.position = this.offset;
        //translate.parent = this.parent;
        this.translate = translate;

        if (this.show_offset) {
            const line = this.make_line(scene);
            line.parent = translate;
            this.line = line;
        }

        return translate;
    }
}
