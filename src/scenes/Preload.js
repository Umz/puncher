import Phaser from "phaser";
import Text from "../common/Text";
import AtlasImg from "../assets/allsheet.png";
import AtlasJson from "../assets/allsheet.json";
import Sfx from "../const/Sfx";
import GameSave from "../util/GameSave";

export default class Preload extends Phaser.Scene {

    constructor() {
        super(Text.PRELOAD);
    }
    
    preload () {
        this.load.atlas(Text.SHEET, AtlasImg, AtlasJson);
        for (let [key, data] of Object.entries(Sfx))
            this.load.audio(data.key, `./src/assets/sounds/${data.key}`);
            //this.load.audio(data.key, `./sounds/${data.key}`);
    }
    
    create () {

        this.createAnimations();
        this.createGraphics();

        GameSave.LoadFromLocalStorage();

        this.scene.launch(Text.BACKGROUND);
        this.scene.launch(Text.MENU);
    }

    createAnimations() {
        let sprites = [Text.SPR_TOLU, Text.SPR_FOREST, Text.SPR_AKI, Text.SPR_SOLDIER, Text.SPR_SOLDIER_HG, Text.SPR_YELLOW, Text.SPR_BLOCKY, Text.SPR_SPY, Text.SPR_NINJA, Text.SPR_SAMURAI];
        for (let sprite of sprites) {
            let prefix = `spr_${sprite}_idle`;
            let config = {
                key: sprite,
                frames: this.anims.generateFrameNames(Text.SHEET, { prefix: prefix, start:1, end: 4}),
                frameRate: 8,
                repeat: -1
            }
            this.anims.create(config);
        }
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