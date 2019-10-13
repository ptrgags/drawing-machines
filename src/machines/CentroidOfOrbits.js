import { Vector3, Color4 } from '@babylonjs/core/Maths/math';

import Machine from './Machine';
import Point from '../parts/Point';
import Trace from '../parts/Trace';
import RotatingSphere from '../parts/RotatingSphere';
import Centroid from '../parts/Centroid';
import ColorStops from '../palettes/ColorStops';

export default class CentroidOfOrbits extends Machine {
    get default_parameters() {
        return {
            trace_length: 1000,
            orbit_length: 100,
            axes: [
                new Vector3(1, 1, 1).normalize(),
                new Vector3(0, 1, 0),
                new Vector3(-1, 1, 2).normalize(),
            ],
            start_directions: [
                new Vector3(1, -1, 1).normalize(),
                new Vector3(1, 0, 0).normalize(),
                new Vector3(1, -1, 1).normalize(),
            ],
            frequencies: [
                3,
                5,
                7,
            ]
        }
    }

    make_orbits(parameters, origin) {
        return parameters.axes.map((axis, i) => {
            return new RotatingSphere({
                parent: origin.to_joint('translate'),
                axes: [axis],
                angular_frequencies: [parameters.frequencies[i]],
                start_direction: parameters.start_directions[i],
            });
        });
    }

    make_orbit_traces(parameters, orbits, origin) {
        return orbits.map((orbit, i) => {
            return new Trace({
                source: orbit.to_joint('translate'),
                origin: origin.to_joint('translate'),
                num_points: parameters.orbit_length,
                palette: new ColorStops({
                    stops: [0, 1],
                    colors: [
                        new Color4(1, 0, 0, 1),
                        new Color4(1, 0, 0, 1),
                    ]
                }),
            });
        });
    }

    init(parameters) {
        const origin = new Point();

        const orbits = this.make_orbits(parameters, origin);
        const orbit_traces = this.make_orbit_traces(parameters, orbits, origin);
        const centroid = new Centroid({
            points: orbits.map(x => x.to_joint('translate')),
            origin: origin.to_joint('translate'),
            weights: new Array(orbits.length).fill(1),
        });

        const trace = new Trace({
            source: centroid.to_joint('translate'),
            origin: origin.to_joint('translate'),
            num_points: parameters.trace_length,
        });

        this.add_part(origin);
        this.add_parts(orbits);
        this.add_parts(orbit_traces);
        this.add_part(centroid);
        this.add_part(trace);

        return origin;
    }
}
