import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class Centroid extends Part {
    get default_parameters() {
        return {
            points: [],
        }
    }

    constructor(parameters) {
        super(parameters);

        this.points = parameters.points;
        this.origin = parameters.origin;
        this.weights = parameters.weights;

        this.translate = undefined;
        this.sphere_primitive = undefined;
    }

    get part_type() {
        return 'centroid';
    }

    get parents() {
        const parent_points = this.points.map(x => x.part);
        parent_points.push(this.origin.part);
        return parent_points;
    }

    /**
     * Compute the point relative to the origin's coordinate system
     */
    static compute_point(joint, inv_origin_matrix) {
        const pos_world = joint.position;
        return Vector3.TransformCoordinates(pos_world, inv_origin_matrix);
    }

    get centroid() {
        const M = this.origin.inverse_matrix; 
        const points = this.points.map(x => Centroid.compute_point(x, M));
        const weights = this.weights;
        const sum = Vector3.Zero(); 
        let weight_sum = 0;
        for (let i = 0; i < points.length; i++) {
            const w = weights[i];
            sum.addInPlace(points[i].scale(w));
            weight_sum += w;
        }
        return sum.scale(1.0 / weight_sum);
    }

    build(scene) {
        const translate = new TransformNode(`${this.id}-translate`, scene);
        translate.position = Vector3.Zero();
        translate.parent = this.origin.node;
        this.translate = translate;

        const sphere = MeshBuilder.CreateSphere(`${this.id}-sphere`, {
            diameter: 0.2,
        }, scene);
        sphere.material = new GridMaterial(`${this.id}-mat-grid`, scene);
        sphere.parent = translate;
        this.sphere_primitive = sphere;
    }

    update(t) {
        const centroid = this.centroid;
        this.translate.position = centroid;
    }
}
