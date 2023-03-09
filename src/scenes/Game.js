import Phaser from "phaser";
import Text from "../common/Text";
import Value from "../common/Value";
import Emitter from "../const/Emitter";
import EmitterFactory from "../factory/EmitterFactory";
import Fighter from "../sprite/Fighter";
import Ready from "../playstate/Ready";
import Fighting from "../playstate/Fighting";
import RoundOver from "../playstate/RoundOver";
import Dom from "../util/Dom";

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
        this.opponentMax = 3;
        this.stateIndex = 0;

        let emitterFactory = new EmitterFactory(this);
        emitterFactory.createEmitter(Text.EMIT_PLATFORM, Emitter.PLATFORM);
        emitterFactory.createEmitter(Text.EMIT_HIT_RIGHT, Emitter.HIT_RIGHT);
        emitterFactory.createEmitter(Text.EMIT_HIT_LEFT, Emitter.HIT_LEFT);

        let platform = this.physics.add.sprite(x, Value.HEIGHT * .6, Text.SHEET, Text.FG_PLATFORM);
        platform.setScale(2);
        platform.setDepth(Value.DEPTH_PLATFORM);
        
        let tl = platform.getTopLeft();
        let fallingRocks = emitterFactory.get(Text.EMIT_PLATFORM);
        fallingRocks.setPosition(tl.x, tl.y + 2);
        fallingRocks.start();

        let tc = platform.getTopCenter();
        let player = new Fighter(this, tc.x-16, tc.y, Text.SHEET, Text.SPR_TOLU);
        let opponent = new Fighter(this, tc.x+16, tc.y, Text.SHEET, Text.SPR_TOLU).setFlipX(true);
        player.playIdle();
        opponent.playIdle();

        this.add.existing(player);
        this.add.existing(opponent);

        this.p1 = player;
        this.p2 = opponent;

        this.tweenInSprite(player);
        this.tweenInSprite(opponent);
        
        this.states = [
            new Ready(this),
            new Fighting(this),
            new RoundOver(this)
        ];

        this.state = this.states[this.stateIndex];
        this.state.init();

        showHP();

        //  STATE Events

        this.events.on(Text.EVENT_NEXT_STATE, (data)=>{
            
            this.stateIndex = this.stateIndex + 1 >= this.states.length ? 0 : this.stateIndex + 1;
            this.state.reset();

            this.state = this.states[this.stateIndex];
            this.state.init(data);
        });

        //  Battle Events

        const shakeCam = this.scene.get(Text.BACKGROUND).cameras.main;
        let emiiterR = emitterFactory.get(Text.EMIT_HIT_RIGHT);
        let emiiterL = emitterFactory.get(Text.EMIT_HIT_LEFT);

        this.events.on(Text.EVENT_HIT, ()=>{
            this.playerHP --;
            player.defend(false);
            opponent.attack();
            emiiterL.explode(70, opponent.getLeftCenter().x, opponent.getLeftCenter().y);
            shakeCam.shake(100, .02, true);
            this.checkRoundOver();
        });

        this.events.on(Text.EVENT_ATTACK, (hit)=>{
            player.attack();
            opponent.defend(!hit)
            if (hit) {
                shakeCam.shake(100, .02, true);
                emiiterR.explode(70, player.getRightCenter().x, player.getRightCenter().y);
                this.opponentHP --;
            }
            this.checkRoundOver();
        });

        this.events.on(Text.EVENT_DEFEND, (blocked)=>{
            player.defend(blocked);
            opponent.attack();
            if (!blocked) {
                shakeCam.shake(100, .02, true);
                this.playerHP --;
                emiiterL.explode(70, opponent.getLeftCenter().x, opponent.getLeftCenter().y);
            }
            this.checkRoundOver();
        });
    }

    update(time, delta) {
        if (this.state)
            this.state.update(time, delta);
    }

    checkRoundOver() {

        updateHP(this.playerHP, this.opponentHP, this.opponentMax);
        
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
            this.opponentMax = this.opponentHP;
        
            this.events.emit(Text.EVENT_NEXT_STATE, win);
            hideHP();
        }
        else {
            this.state.setNextButton();
        }
    }

    resetRound() {

        if (this.p1.alpha === 0) {
            this.roundsWon = 0;
            this.opponentHP = 3;
            this.opponentMax = this.opponentHP;
            this.tweenInSprite(this.p1);
        }
        
        if (this.p2.alpha === 0) {
            // Choose a new Sprite
            // Set
            this.tweenInSprite(this.p2);
        }

        updateRoundNumber(this.roundsWon + 1);
        updateHP(this.playerHP, this.opponentHP, this.opponentMax);
        showHP();
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
        this.state.reset();
        this.scene.launch(Text.MENU, {remove:true});
        this.scene.setVisible(false);
    }
}

function showHP() {
    Dom.SetVisible(Text.HUD_HEALTH);
    Dom.SetVisible(Text.HUD_ROUND);
}

function hideHP() {
    Dom.SetHidden(Text.HUD_HEALTH);
    Dom.SetHidden(Text.HUD_ROUND);
}

function updateHP(playerHP, oppHP, oppMax) {
    let playerPC = Math.round(playerHP / 3 * 100);
    let opponentPC = Math.round(oppHP / oppMax * 100);
    Dom.SetHP(Text.HUD_PLAYER_HP, playerPC);
    Dom.SetHP(Text.HUD_OPPONENT_HP, opponentPC);
}

function updateRoundNumber(num) {
    Dom.SetText(Text.HUD_ROUND, "Round " + num);
}