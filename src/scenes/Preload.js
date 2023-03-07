import Phaser from "phaser";
import Text from "../common/Text";
import AtlasImg from "../assets/allsheet.png";
import AtlasJson from "../assets/allsheet.json";

export default class Preload extends Phaser.Scene {

    constructor() {
        super(Text.PRELOAD);
    }
    
    preload () {
        this.load.atlas(Text.SHEET, AtlasImg, AtlasJson);
    }
    
    create () {

        this.createAnimations();
        this.createGraphics();

        this.scene.launch(Text.BACKGROUND);
        this.scene.launch(Text.GAME);
    }

    createAnimations() {
        let fighters = [
            { key: Text.SPR_TOLU, frames: this.anims.generateFrameNames(Text.SHEET, { prefix: 'spr_tolu_idle', start:1, end: 4}), frameRate: 8, repeat: -1 },
        ];
        for (let ff of fighters)
            this.anims.create(ff);
    }

    createGraphics() {
        
        let graphics = this.add.graphics();
        
        CreateWindCicle: {
            let rad = 5;
            for (let i=0; i<rad; i++) {
                graphics.fillStyle(0xFFFFFF, i * .2);
                graphics.fillCircle(rad, rad, rad - (rad * i * .2));
            }
            graphics.generateTexture(Text.TX_WIND, rad * 3, rad * 3);
            graphics.clear();
        }

        graphics.destroy();
    }
}