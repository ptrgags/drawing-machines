import { Vector3 } from "@babylonjs/core/Maths/math";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";

import Part from './Part';

export default class CenteredTrochoid extends Part {
    get default_parameters() {
        return {
            parent: undefined,
            // The frame circle's radius
            frame_radius: 0.96,
            // wheel_radius can be > 0 for epitrochoids or < 0 for 
            // hypotrochoids
            wheel_radius: -0.30,
            // How fast the center of the wheel is rotating with respect
            // to the center of the frame
            angular_frequency: 4,
            // Initial angle of the wheel relative to the center of the frame
            // circle
            frame_phase: 0,
            // Initial angle of the wheel relative to the wheel center
            wheel_phase: 0,
            // Show the radii for debuggging
            show_radii: false,
            // Offset to put the trace relative to the wheel center
            offset: new Vector3(0.2, 0, 0)
        }
    }

    init(parameters) {
        super.init(parameters);

        this.offset = parameters.offset;
        this.show_radii = parameters.show_radii;
        this.frame_radius = parameters.frame_radius;
        this.wheel_radius = parameters.wheel_radius;
        this.angular_frequency = parameters.angular_frequency;
        this.frame_phase = parameters.frame_phase;
        this.wheel_phase = parameters.frame_phase;
        this.frame_angle = parameters.frame_phase;
        this.wheel_angle = parameters.wheel_phase;
    }

    get primitive_names() {
        return ['frame_radius_primitive', 'wheel_radius_primitive'];
    }

    get transform_names() {
        return [
            'rotate_frame', 
            'translate_frame', 
            'translate_wheel', 
            'rotate_wheel', 
            'translate_offset'
        ];
    }

    get part_type() {
        return 'centered-trochoid'
    }

    build(scene) {
        const rotate_frame = new TransformNode(
            `${this.id}-rotate-frame`, scene);
        rotate_frame.rotation.y = this.frame_angle;
        if (this.parent !== undefined) {
            rotate_frame.parent = this.parent.node;
        }
        this.rotate_frame = rotate_frame;

        const translate_frame = new TransformNode(
            `${this.id}-translate-frame`, scene);
        translate_frame.position = new Vector3(this.frame_radius, 0, 0);
        translate_frame.parent = rotate_frame;
        this.translate_frame = translate_frame;

        const translate_wheel = new TransformNode(
            `${this.id}-translate-wheel`, scene);
        translate_wheel.position = new Vector3(this.wheel_radius, 0, 0);
        translate_wheel.parent = translate_frame;
        this.translate_wheel = translate_wheel;

        const rotate_wheel = new TransformNode(
            `${this.id}-rotate-wheel`, scene);
        rotate_wheel.rotation.y = this.wheel_angle;
        rotate_wheel.parent = translate_wheel;
        this.rotate_wheel = rotate_wheel;

        const offset = new TransformNode(
            `${this.id}-translate-offset`, scene);
        offset.position = this.offset;
        offset.parent = rotate_wheel;
        this.translate_offset = offset;


        if (!this.show_radii) {
            return;
        }

        const line_frame = MeshBuilder.CreateLines(`${this.id}-line-frame`, {
            points: [
                Vector3.Zero(),
                new Vector3(-this.frame_radius, 0, 0),
            ]
        }, scene);
        line_frame.parent = translate_frame;
        this.frame_radius_primitive = line_frame;

        const line_wheel = MeshBuilder.CreateLines(`${this.id}-line-wheel`, {
            points: [
                Vector3.Zero(),
                new Vector3(-this.wheel_radius, 0, 0),
            ]
        }, scene);
        line_wheel.parent = translate_wheel;
        this.wheel_radius_primitive = line_wheel;

        const line_offset = MeshBuilder.CreateLines(`${this.id}-line-offset`, {
            points: [
                Vector3.Zero(),
                this.offset.negate(),
            ]
        }, scene);
        line_offset.parent = offset;
        this.offset_primitive = line_offset;

    }

    get wheel_ratio() {
        if (this.wheel_radius === 0) {
            return 1;
        }
        return 1 + this.frame_radius / this.wheel_radius;
    }

    update(t) {
        const theta = this.angular_frequency * t;
        this.frame_angle = theta + this.frame_phase;
        this.wheel_angle = this.wheel_ratio * theta + this.wheel_phase;

        this.rotate_frame.rotation.y = this.frame_angle;
        this.rotate_wheel.rotation.y = this.wheel_angle;
    }
}
