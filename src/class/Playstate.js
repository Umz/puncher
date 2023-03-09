import Text from "../common/Text";
import Counter from "../util/Counter";

export default class Playstate {

    constructor(scene) {
        this.scene = scene;
        this.juke = scene.juke;
        this.counter = new Counter();
    }

    init() {}

    update(time, delta) {}

    nextState() {
        this.fireEvent(Text.EVENT_NEXT_STATE);
    }

    reset() {
        this.counter.resetCount();
    }

    fireEvent(eventName, data) {
        this.scene.events.emit(eventName, data);
    }

    playSound(sfx) {
        this.juke.play(sfx);
    }
}