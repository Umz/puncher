import Phaser from "phaser";
import Text from "../common/Text";
import Value from "../common/Value";

export default class Background extends Phaser.Scene {

    constructor() {
        super(Text.BACKGROUND);
    }
    
    create () {
        
        let x = Value.WIDTH / 2;
        let y = Value.HEIGHT / 2;

        let statue = this.add.image(x, y, Text.SHEET, Text.BG_STATUE);
        statue.setScale(Value.HEIGHT / 15).setAlpha(.5);

        this.cloudTile = this.add.tileSprite(0, Value.HEIGHT, Value.WIDTH, Value.CLOUD_HEIGHT, Text.SHEET, Text.BG_CLOUD).setOrigin(0,1);
    }

    update(time, delta) {
        
        this.cloudTile.tilePositionX += 12 * (.001 * delta);
    }
    
}