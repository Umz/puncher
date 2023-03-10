import Playstate from "../class/Playstate";
import Text from "../common/Text";
import Dom from "../util/Dom";
import GameSave from "../util/GameSave";
import KeyControl from "../util/KeyControl";

const LEFT = 1;
const RIGHT = 2;

export default class Filling extends Playstate {

    constructor(scene) {
        super(scene);
        
        this.counter.setRepeating(true);
        this.responseTime = 3000;

        this.lastButtons = [3, 3, 3];
        this.nextButton = 1;
    }

    init() {
        
        KeyControl.AddRightControl(this.scene, (event) => {
            this.buttonPress(RIGHT);
        });
        KeyControl.AddLeftControl(this.scene, (event) => {
            this.buttonPress(LEFT);
        });

        this.responseTime = Math.max(this.responseTime - 100, 200);
        this.counter.setMaxCount(this.responseTime);
        this.lastButtons.length = 0;
        this.setNextButton();
    }

    reset() {
        super.reset();
        KeyControl.RemoveAllControls(this.scene);
    }

    update(time, delta) {
        if (this.counter.updateAndCheck(time, delta)) {
            hideArrows();
            this.fireEvent(Text.EVENT_HIT);
        }

        GameSave.IncPlayTime(delta);
    }

    setNextButton() {

        const allEqual = arr => arr.every( v => v === arr[0] );

        // Contact DOM to display on screen
        this.nextButton = Phaser.Math.Between(LEFT, RIGHT);

        //  Regulate frequency of presses
        this.lastButtons.push(this.nextButton);
        if (this.lastButtons.length >= 3)
            this.lastButtons.shift();
        
        if (allEqual(this.lastButtons)) {
            this.nextButton = (this.nextButton === LEFT) ? RIGHT : LEFT;
            this.lastButtons[2] = this.nextButton;
        }
        
        let id = (this.nextButton === LEFT) ? Text.HUD_ARROW_LEFT : Text.HUD_ARROW_RIGHT;
        showArrow(id);
    }

    buttonPress(val) {
        hideArrows();

        let correctPress = val === this.nextButton;
        let event = (this.nextButton === LEFT) ? Text.EVENT_DEFEND : Text.EVENT_ATTACK;
        this.fireEvent(event, correctPress);
        
        this.counter.resetCount();
    }
}

function showArrow(id) {
    Dom.SetDisplayBlock(id);
}

function hideArrows() {
    Dom.SetDisplayNone(Text.HUD_ARROW_LEFT);
    Dom.SetDisplayNone(Text.HUD_ARROW_RIGHT);
}
