import Playstate from "../class/Playstate";
import Text from "../common/Text";

const LEFT = 1;
const RIGHT = 2;

export default class Filling extends Playstate {

    constructor(scene) {
        super(scene);
        
        this.counter.setRepeating(true);
        this.responseTime = 3000;

        this.lastButtons = [3, 3, 3];
        this.nextButton = 1;

        scene.input.keyboard.on('keydown-RIGHT', (event) => {
            this.buttonPress(RIGHT);
        });
        scene.input.keyboard.on('keydown-LEFT', (event) => {
            this.buttonPress(LEFT);
        });
    }

    init() {
        this.responseTime = Math.max(this.responseTime - 100, 200);
        this.counter.setMaxCount(this.responseTime);
        this.lastButtons.length = 0;
        this.setNextButton();
    }

    update(time, delta) {
        if (this.counter.updateAndCheck(time, delta)) {
            this.fireEvent(Text.EVENT_HIT);
            this.setNextButton();
        }
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
        
        let todo = (this.nextButton === LEFT) ? 'PRESS LEFT' : 'PRESS RIGHT';
        //console.log(todo);
    }

    buttonPress(val) {

        let correctPress = val === this.nextButton;
        let event = (this.nextButton === LEFT) ? Text.EVENT_DEFEND : Text.EVENT_ATTACK;
        this.fireEvent(event, correctPress);

        this.setNextButton();
        this.counter.resetCount();
    }
}