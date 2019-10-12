import { Vector3 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';

export default class CenteredTrochoidCar extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
            wheel_radius: 0.4,
            car_frequency: 0.5,
            wheel_frequency: 8,
        }
    }

    static get OFFSETS() {
        return [
            new Vector3(1, 0, 1).normalize(),
            new Vector3(-1, 0, 1).normalize(),
            new Vector3(1, 0, -1).normalize(),
            new Vector3(-1, 0, -1).normalize(),
        ]
    }

    make_wheel_offsets(parameters, rotation) {
        return CenteredTrochoidCar.OFFSETS.map(offset => {
            return new Point({
                parent: rotation.to_joint('translate'),
                offset,
                show_offset: true
            });
        });
    }

    make_wheels(parameters, offsets) {
        return offsets.map(offset => {
            return new RotatingSphere({
                parent: offset.to_joint('translate'),
                start_direction: new Vector3(0, 0, 1),
                axes: [
                    new Vector3(-1, 0, 0)
                ],
                angular_frequencies: [
                   parameters.wheel_frequency
                ],
                radius: parameters.wheel_radius,
            })
        })
    }

    make_wheel_traces(parameters, origin, wheels) {
        return wheels.map(wheel => {
            return new Trace({
                source: wheel.to_joint('translate'),
                origin: origin.to_joint('translate'),
                trace_length: parameters.trace_length
            });
        });
    }

    init(parameters) {
        const origin = new Point();
        const rotation = new RotatingSphere({
            parent: origin.to_joint('translate'),
            axes: [
                new Vector3(0, 1, 0)
            ],
            angular_frequencies: [
                parameters.car_frequency
            ]
        });
        const wheel_offsets = this.make_wheel_offsets(parameters, rotation);
        const wheels = this.make_wheels(parameters, wheel_offsets); 
        const wheel_traces = this.make_wheel_traces(parameters, origin, wheels);

        this.add_part(origin);
        this.add_part(rotation);
        this.add_parts(wheel_offsets);
        this.add_parts(wheels);
        this.add_parts(wheel_traces);

        return origin;
    }
}
