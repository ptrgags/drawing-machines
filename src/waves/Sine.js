import Wave from './Wave';

export default class Sine extends Wave {
    compute(t) {
        return Math.sin(t);
    }
}
