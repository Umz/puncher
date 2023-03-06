import Phaser from "phaser";
import Text from "../common/Text";

export default class Preload extends Phaser.Scene {

    constructor() {
        super(Text.PRELOAD);
    }
    
    preload () {
        this.load.setBaseURL('./src/assets/');
        this.load.image('logo', 'logo.png');
    }
    
    create () {

        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}