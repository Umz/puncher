import Phaser from "phaser";
import Text from "../common/Text";

export default class Preload extends Phaser.Scene {

    constructor() {
        super(Text.PRELOAD);
    }
    
    preload () {
        this.load.setBaseURL(Text.ASSET_PATH);
        this.load.atlas(Text.SHEET, Text.SHEET_PNG, Text.SHEET_JSON);
    }
    
    create () {

        this.createGraphics();

        this.scene.launch(Text.BACKGROUND);
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