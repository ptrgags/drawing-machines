import { Color4 } from "@babylonjs/core/Maths/math";

import Palette from './Palette';

function lerp(a, b, t) {
    return a * (1.0 - t) + b * t;
}

function lerp_colors(color_a, color_b, t) {
    const r = lerp(color_a.r, color_b.r, t);
    const g = lerp(color_a.g, color_b.g, t);
    const b = lerp(color_a.b, color_b.b, t);
    const a = lerp(color_a.a, color_b.a, t);
    return new Color4(r, g, b, a);
}

function smoothstep(a, b, t) {
    if (t < a) {
        return 0;
    } 

    if (b < t) {
        return 1;
    }

    return 3 * t * t - 2 * t * t * t;
}

export default class ColorStops extends Palette {
    get default_parameters() {
        return {
            stops: [0, 1/3, 2/3, 1],
            colors: [
                new Color4(0, 0, 0, 1),
                new Color4(1, 0, 0, 1),
                new Color4(0, 0, 0, 1),
                new Color4(0, 0, 1, 1),
            ]
        }
    }

    init(parameters) {
        this.stops = parameters.stops;
        this.colors = parameters.colors;
    }

    get_color(t) {
        let result = this.colors[0];
        for (let i = 1; i < this.colors.length; i++) {
            const prev_stop = this.stops[i - 1];
            const stop = this.stops[i];
            const color = this.colors[i];
            const blend_factor = smoothstep(prev_stop, stop, t);
            result = lerp_colors(result, color, blend_factor);
        }
        return result;
    }
}
