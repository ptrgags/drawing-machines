import Wave from './Wave';

export default class Fourier extends Wave {
    constructor(parameters) {
        super();
        this.amplitudes = parameters.amplitudes;
        this.frequencies = parameters.frequencies;
    }

    compute(t) {
        let result = 0.0;
        let amp_sum = 0.0;
        for (let i = 0; i < this.amplitudes.length; i++) {
            const amp = this.amplitudes[i];
            const freq = this.frequencies[i];
            result += amp * Math.sin(freq * t);
            amp_sum += amp;
        }
        return result / amp_sum;
    }
}
