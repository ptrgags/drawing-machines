import Wave from './Wave';

export default class Square extends Wave {
    compute(t) {
        return Math.sign(Math.sin(t));
    }
}
