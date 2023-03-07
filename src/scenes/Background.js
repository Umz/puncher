import Phaser from "phaser";
import Text from "../common/Text";
import Value from "../common/Value";
import TrailWind from "../sprite/TrailWind";
import EmitterFactory from "../factory/EmitterFactory";
import Emitter from "../const/Emitter";

export default class Background extends Phaser.Scene {

    constructor() {
        super(Text.BACKGROUND);
    }
    
    create () {
        
        let x = Value.WIDTH / 2;
        let y = Value.HEIGHT / 2;

        this.updateGroup = this.add.group({ runChildUpdate: true });

        let emitterFactory = new EmitterFactory(this);
        emitterFactory.createEmitter(Text.EMIT_WIND, Emitter.WIND);

        //  Cover image

        let statue = this.add.image(x, y, Text.SHEET, Text.BG_STATUE);
        statue.setScale(Value.HEIGHT / 15).setAlpha(.5);

        //  Repeating Cloud Tile

        let cloudTile = this.add.tileSprite(0, Value.HEIGHT, Value.WIDTH, Value.CLOUD_HEIGHT, Text.SHEET, Text.BG_CLOUD).setOrigin(0,1);
        cloudTile.update = function(time, delta) {
            this.tilePositionX += 12 * (.001 * delta);
        }
        this.updateGroup.add(cloudTile);

        //  Single wind particle

        let windParticle = new TrailWind(this, x, y);
        emitterFactory.get(Text.EMIT_WIND).startFollow(windParticle);
        emitterFactory.get(Text.EMIT_WIND).start();
        this.physics.add.existing(windParticle);
        this.updateGroup.add(windParticle, true);
    }

    update(time, delta) {
    }
}