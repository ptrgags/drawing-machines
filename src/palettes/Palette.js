import { Color4 } from "@babylonjs/core/Maths/math";

export default class Palette {
    get default_parameters() {
        return {};
    }

    constructor(parameters) {
        this.init({...this.default_parameters, ...parameters});
    }

    init(parameters) {

    }

    get_color(t) {
        // Subclasses can return a color for an input
        // t from [0, 1]
        return new Color4(0, 0, 0, 0);
    }

    get_palette(n, freq) {
        const results = [];
        for (let i = 0; i < n; i++) {
            const t = i / (n - 1);
            const effective_t = (t * freq) % 1.0;
            results.push(this.get_color(effective_t));
        }
        return results;
    }
}
