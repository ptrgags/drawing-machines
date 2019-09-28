import { Vector3, Color4 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';
import { required } from '../util';

export default class Trace extends Part {
    get default_parameters() {
        return {
            // The joint to trace (the pen) (required)
            source: undefined,
            // The reference frame to draw on (the 3D paper) (optional)
            target: undefined,
            // The reference frame to use as the origin
            origin: undefined,
            // Number of points in the polyline
            num_points: 1000,
            // Color of the trace (default orange)
            color: new Color4(1, 0.5, 0, 1),
        };
    }

    init(parameters) {
        this.source = required(parameters, 'source');
        this.target = parameters.target;
        this.origin = required(parameters, 'origin');

        this.points = [];
        this.num_points = parameters.num_points;
        this.color = parameters.color;
    }

    get primitive_names() {
        return ['polyline_primitive'];
    }

    init_points() {
        const points = [];
        const initial_pos = this.compute_point();
        for (let i = 0; i < this.num_points; i++) {
            points.push(initial_pos);
        }
        return points;
    }

    get part_type() {
        return 'trace';
    }

    get parents() {
        const parent_list = [this.source.part, this.origin.part];

        if (this.target !== undefined) {
            parent_list.push(this.target.part);
        }

        return parent_list; 
    }

    build(scene) {
        const points = this.init_points();
        const polyline = MeshBuilder.CreateLines(`${this.id}-polyline`, {
            colors: Array(points.length).fill(this.color),
            updatable: true,
            points: points
        }, scene);
        
        polyline.parent = this.origin.node;

        this.polyline_primitive = polyline;
        this.points = points;
    }

    compute_point() {
        // Compute the position of the pen in world space
        let position = this.source.position;

        // Transform things into the "paper" coordinate frame. For a turntable
        // drawing machine, this could be a rotating reference frame.
        if (this.target !== undefined) {
            const M_paper = this.target.inverse_matrix; 
            position = Vector3.TransformCoordinates(position, M_paper); 
        }

        return position;
    }

    update(t) {
        const points = this.points;
        const point = this.compute_point();
        points.push(point);
        points.shift();

        this.polyline_primitive = MeshBuilder.CreateLines(`${this.id}-polyline`, {
            instance: this.polyline_primitive,
            points: points
        });
    }
}
