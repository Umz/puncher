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
        this.scene.launch(Text.BACKGROUND);
    }
}