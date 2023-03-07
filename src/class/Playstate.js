import Counter from "../util/Counter";

export default class Playstate {

    constructor(scene) {
        this.scene = scene;
        this.counter = new Counter();
    }

    init() {}

    update(time, delta) {}

    nextState() {
        // Fire off a Signal to inc the state
    }

    reset() {
        this.counter.resetCount();
    }
}