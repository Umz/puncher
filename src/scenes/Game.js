import Phaser from "phaser";
import Text from "../common/Text";
import Value from "../common/Value";
import Emitter from "../const/Emitter";
import EmitterFactory from "../factory/EmitterFactory";
import Fighter from "../sprite/Fighter";
import Ready from "../playstate/Ready";
import Fighting from "../playstate/Fighting";
import RoundOver from "../playstate/RoundOver";

export default class Game extends Phaser.Scene {
      
    constructor() {
        super(Text.GAME);
    }
    
    create () {

        let x = Value.WIDTH / 2;
        let y = Value.HEIGHT / 2;

        this.roundsWon = 0;
        this.playerHP = 3;
        this.opponentHP = 3;
        this.stateIndex = 0;

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

        this.add.existing(player);
        this.add.existing(opponent);

        this.p1 = player;
        this.p2 = opponent;
        
        this.states = [
            new Ready(this),
            new Fighting(this),
            new RoundOver(this)
        ];

        this.state = this.states[this.stateIndex];
        this.state.init();

        //  STATE Events

        this.events.on(Text.EVENT_NEXT_STATE, ()=>{
            
            this.stateIndex = this.stateIndex + 1 >= this.states.length ? 0 : this.stateIndex + 1;
            this.state.reset();

            this.state = this.states[this.stateIndex];
            this.state.init();
        });

        //  Battle Events

        this.events.on(Text.EVENT_HIT, ()=>{
            this.playerHP --;
            player.defend(false);
            opponent.attack();
            this.checkRoundOver();
        });

        this.events.on(Text.EVENT_ATTACK, (hit)=>{
            player.attack();
            opponent.defend(!hit)
            if (hit)
                this.opponentHP --;
            this.checkRoundOver();
        });

        this.events.on(Text.EVENT_DEFEND, (blocked)=>{
            player.defend(blocked);
            opponent.attack();
            if (!blocked)
                this.playerHP --;
            this.checkRoundOver();
        });
    }

    update(time, delta) {
        if (this.state)
            this.state.update(time, delta);
    }

    checkRoundOver() {
        
        if (this.playerHP <= 0 || this.opponentHP <= 0) {

            let win = this.playerHP > 0;
            if (win) {
                this.roundsWon ++;
                this.p1.playIdle();
                this.p2.setAlpha(0);
            }
            else {
                this.p2.playIdle();
                this.p1.setAlpha(0)
            }

            this.playerHP = 3;
            this.opponentHP = 3 + this.roundsWon;
        
            this.events.emit(Text.EVENT_NEXT_STATE);
        }
    }

    resetRound() {

        if (this.p1.alpha === 0) {
            this.roundsWon = 0;
            this.opponentHP = 3;
            this.tweenInSprite(this.p1);
        }
        
        if (this.p2.alpha === 0) {
            // Choose a new Sprite
            //  Set
            this.tweenInSprite(this.p2);
        }
    }
    
    tweenInSprite(sprite) {
        this.tweens.add({
            targets: sprite,
            duration: 500,
            alpha: {from: 0, to: 1},
            scaleX: {from: 0, to: 2},
            ease: Phaser.Math.Easing.Circular.Out,
            onComplete: ()=>{
                sprite.playIdle();
            }
        })
    }

    exitToMenu() {
        this.scene.start(Text.MENU);
    }
}