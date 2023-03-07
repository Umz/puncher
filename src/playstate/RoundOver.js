import Playstate from "../class/Playstate";
import Text from "../common/Text";

export default class Ready extends Playstate {

    constructor(scene) {
        super(scene);
    }

    init() {

        this.scene.input.keyboard.on('keydown-RIGHT', (event) => {
            this.fireEvent(Text.EVENT_NEXT_STATE);
        });
        this.scene.input.keyboard.on('keydown-LEFT', (event) => {
            this.scene.exitToMenu();
        });

        //  Choose another opponent option on Menu
        this.showNotice();
        console.log('Round Over init()')
    }

    reset() {
        super.reset();
        this.scene.input.keyboard.off('keydown-LEFT');
        this.scene.input.keyboard.off('keydown-RIGHT');
    }

    update(time, delta) {
        // WAIT for input to
    }

    showNotice() {
        // Contact the Dom to do the notice
    }
}