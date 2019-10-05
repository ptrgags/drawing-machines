import { Color4 } from "@babylonjs/core/Maths/math";

export default class Palette {
    get_color(t) {
        // Subclasses can return a color for an input
        // t from [0, 1]
        return new Color4(0, 0, 0, 0);
    }

    get_palette(n) {
        const results = [];
        for (let i = 0; i < n; i++) {
            const t = i / (n - 1);
            results.push(this.get_color(t));
        }
        return results;
    }
}
