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
import Juke from "../util/Juke";
import Sfx from "../const/Sfx";
import GameSave from "../util/GameSave";

export default class Game extends Phaser.Scene {
      
    constructor() {
        super(Text.GAME);
    }
    
    create () {

        const juke = new Juke(this);
        this.juke = juke;

        let x = Value.WIDTH / 2;
        let y = Value.HEIGHT / 2;

        this.roundsWon = 0;
        this.playerHP = 3;
        this.playerMax = 3;
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
        
        this.add.existing(player);
        this.add.existing(opponent);
        this.physics.add.existing(player);
        this.physics.add.existing(opponent);
        
        opponent.setRandomSprite();
        player.playIdle();
        opponent.playIdle();

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
        juke.play(Sfx.MUS_FIGHT);

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

            juke.play(Sfx.GAME_PUNCH);
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
                juke.play(Sfx.GAME_PUNCH);
            }
            else
                juke.play(Sfx.GAME_BLOCK);

            this.checkRoundOver();
        });

        this.events.on(Text.EVENT_DEFEND, (blocked)=>{
            
            player.defend(blocked);
            opponent.attack();

            if (!blocked) {
                shakeCam.shake(100, .02, true);
                this.playerHP --;
                emiiterL.explode(70, opponent.getLeftCenter().x, opponent.getLeftCenter().y);
                juke.play(Sfx.GAME_PUNCH);
            }
            else
                juke.play(Sfx.GAME_BLOCK);

            this.checkRoundOver();
        });
    }

    update(time, delta) {
        if (this.state)
            this.state.update(time, delta);
    }

    checkRoundOver() {

        updateHP(this.playerHP, this.playerMax, this.opponentHP, this.opponentMax);
        
        if (this.playerHP <= 0 || this.opponentHP <= 0) {

            let win = this.playerHP > 0;
            if (win) {
                
                this.roundsWon ++;
                GameSave.SetMaxRound(this.roundsWon);

                this.p1.playIdle();
                this.p2.setAlpha(0);

                let snd = Phaser.Utils.Array.GetRandom([Sfx.GAME_DIE1, Sfx.GAME_DIE2, Sfx.GAME_DIE3, Sfx.GAME_DIE4]);
                this.juke.play(snd);
            }
            else {
                this.p2.playIdle();
                this.p1.setAlpha(0);
                this.juke.play(Sfx.GAME_DIE5);
            }

            this.playerMax = (this.roundsWon >= 20) ? 5 : (this.roundsWon >= 10) ? 4 : 3;
            this.opponentMax = Math.min(3 + this.roundsWon, 10);
        
            this.events.emit(Text.EVENT_NEXT_STATE, win);
            GameSave.IncRoundsPlayed();
            hideHP();
        }
        else {
            this.state.setNextButton();
        }
    }

    resetRound() {

        if (this.p1.alpha === 0) {    
            this.tweenInSprite(this.p1);
        }
        
        if (this.p2.alpha === 0) {
            this.p2.setRandomSprite();
            this.tweenInSprite(this.p2);
        }

        this.playerHP = this.playerMax;
        this.opponentHP = this.opponentMax;
        
        updateRoundNumber(this.roundsWon + 1);
        updateHP(this.playerHP, this.playerMax, this.opponentHP, this.opponentMax);
        showHP();

        GameSave.SaveToLocalStorage();
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
                this.p2.setY(this.p1.getBottomCenter().y);
                this.p2.resetPosition();
            }
        });
        this.juke.play(Sfx.GAME_WARP);
    }

    exitToMenu() {

        this.state.reset();
        this.scene.launch(Text.MENU, {remove:true});
        this.scene.setVisible(false);

        this.juke.stop(Sfx.MUS_FIGHT);
        this.juke.play(Sfx.MENU_CLOSE);
    }

    restartFromMenu() {
        
        this.roundsWon = 0;
        this.states[1].resetCountToDefault();

        this.playerHP = 3;
        this.playerMax = this.playerHP;

        this.opponentHP = 3;
        this.opponentMax = this.opponentHP;

        this.juke.play(Sfx.MUS_FIGHT);
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

function updateHP(playerHP, playerMax, oppHP, oppMax) {
    let playerPC = Math.round(playerHP / playerMax * 100);
    let opponentPC = Math.round(oppHP / oppMax * 100);
    Dom.SetHP(Text.HUD_PLAYER_HP, playerPC);
    Dom.SetHP(Text.HUD_OPPONENT_HP, opponentPC);
}

function updateRoundNumber(num) {
    Dom.SetText(Text.HUD_ROUND, "Round " + num);
}