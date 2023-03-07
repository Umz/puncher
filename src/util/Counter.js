export default class Counter {

    constructor() {
        this.counter = 0;
        this.counterMax = 1000;
        this.isRepeating = false;
        this.isActive = true;
    }

    update(time, delta) {
        if (this.isActive)
            this.counter += delta;
    }

    updateAndCheck(time, delta) {
        this.update(time, delta);
        return this.isComplete();
    }

    setRepeating(bool) {
        this.isRepeating = bool;
        return this;
    }

    setActive(active) {
        this.isActive = active;
        return this;
    }

    setMaxCount(max) {
        this.counterMax = max;
        return this;
    }

    isComplete() {
        return this.isRepeating ? this.isCountUpRepeat() : this.isCountUp();
    }

    isCountUp() {
        return this.counter >= this.counterMax;
    }

    isCountUpRepeat() {
        if (this.isCountUp()) {
            this.counter = 0;
            return true;
        }
        return false;
    }
}