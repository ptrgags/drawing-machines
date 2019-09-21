import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class Trace extends Part {
    constructor(parameters) {
        super(parameters);

        // The joint to trace (the pen) (required)
        this.source = parameters.source;
        // The reference frame to draw on (the 3D paper) (optional)
        this.reference_frame = parameters.reference_frame;
        // The transform to apply to the reference frame (rotating the paper) 
        // (optional)
        this.parent = parameters.parent;
        // The number of points in the trail. (required)
        this.num_points = parameters.num_points;
        this.points = [];

        this.polyline_primitive = undefined;
    }

    init_points() {
        const points = [];
        const initial_pos = this.source.position;
        for (let i = 0; i < this.num_points; i++) {
            points.push(initial_pos);
        }
        return points;
    }

    get part_type() {
        return 'trace';
    }

    get parents() {
        const parent_list = [this.source.part];

        if (this.reference_frame !== undefined) {
            parent_list.push(this.reference_frame.part);
        }

        if (this.parent !== undefined) {
            parent_list.push(this.parent.part);
        }

        return parent_list; 
    }

    build(scene) {
        const points = this.init_points();
        const polyline = MeshBuilder.CreateLines(`${this.id}-polyline`, {
            updatable: true,
            points: points
        }, scene);
        
        if (this.parent !== undefined) {
            polyline.parent = this.parent.node;
        }


        this.polyline_primitive = polyline;
        this.points = points;
    }

    compute_point() {
        // Compute the position of the pen in world space
        let position = this.source.position;

        // Transform things into the "paper" coordinate frame. For a turntable
        // drawing machine, this could be a rotating reference frame.
        if (this.reference_frame !== undefined) {
            const M_paper = this.reference_frame.inverse_matrix; 
            position = Vector3.TransformCoordinates(position, M_paper); 
        }

        return position;
    }

    update(t) {
        const points = this.points;
        const point = this.compute_point();
        points.push(point);
        points.shift();

        this.polyline_primitive = MeshBuilder.CreateLines(null, {
            updatable: true,
            instance: this.polyline_primitive,
            points: points
        }, null);
    }
}
