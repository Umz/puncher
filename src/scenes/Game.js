import Phaser from "phaser";
import Text from "../common/Text";
import Value from "../common/Value";
import Emitter from "../const/Emitter";
import EmitterFactory from "../factory/EmitterFactory";
import Fighter from "../sprite/Fighter";

export default class Game extends Phaser.Scene {
      
    constructor() {
        super(Text.GAME);
    }
    
    create () {

        let x = Value.WIDTH / 2;
        let y = Value.HEIGHT / 2;

        let emitterFactory = new EmitterFactory(this);
        emitterFactory.createEmitter(Text.EMIT_PLATFORM, Emitter.PLATFORM);

        let platform = this.physics.add.sprite(x, y, Text.SHEET, Text.FG_PLATFORM);
        platform.setScale(2);
        platform.setDepth(Value.DEPTH_PLATFORM);
        let pos = platform.getTopLeft();

        let fallingRocks = emitterFactory.get(Text.EMIT_PLATFORM);
        fallingRocks.setPosition(pos.x, pos.y + 2);
        fallingRocks.start();

        let player = new Fighter(this, x-16, pos.y, Text.SHEET, Text.SPR_TOLU);
        let opponent = new Fighter(this, x+16, pos.y, Text.SHEET, Text.SPR_TOLU).setFlipX(true);

        player.playIdle();
        opponent.playIdle();

        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                let isPlayerWin = true;
                player.punchAttack(isPlayerWin);
                opponent.punchAttack(!isPlayerWin);
            }
        });
        this.time.addEvent({
            delay: 2200,
            callback: ()=>{
                player.resetPosition();
                opponent.resetPosition();
            }
        });
        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                player.playIdle();
                opponent.playIdle();
            }
        });

        this.tweens.add({
            targets: player,
            duration: 500,
            scaleX: {from: 0, to: 2},
            ease: Phaser.Math.Easing.Circular.Out
        })

        this.add.existing(player);
        this.add.existing(opponent);
    }

    update(time, delta) {
    }
    
}