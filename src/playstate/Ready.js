import Playstate from "../class/Playstate";

export default class Ready extends Playstate {

    constructor(scene) {
        super(scene);
        this.counter.setMaxCount(500);
    }

    update(time, delta) {
        if (this.counter.updateAndCheck(time, delta))
            this.nextState();
    }

    init() {
        //  Show the Get Ready on HUD
        this.showNotice();
        this.scene.resetRound();
    }

    showNotice() {
        // Contact the Dom to do the notice
    }

    hideNotice() {
        //  Contact the DOM to do the notice
    }
}