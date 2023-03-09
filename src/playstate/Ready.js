import Playstate from "../class/Playstate";
import Text from "../common/Text";
import Dom from "../util/Dom";
import Sfx from "../const/Sfx";

export default class Ready extends Playstate {

    constructor(scene) {
        super(scene);
        this.counter.setMaxCount(1500);
    }

    update(time, delta) {
        if (this.counter.updateAndCheck(time, delta)) {
            this.nextState();
            this.playSound(Sfx.GAME_START);
        }
    }

    init() {
        this.scene.resetRound();
        Dom.SetVisible(Text.HUD_READY);
    }

    reset() {
        super.reset();
        Dom.SetHidden(Text.HUD_READY);
    }
}