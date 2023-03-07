import Text from '../common/Text';
import Value from '../common/Value';
import Counter from '../util/Counter';

export default class Fighter extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, atlas, prefix) {
        super(scene, x, y, atlas, `spr_${prefix}_idle1`);
        this.setScale(2)
        this.setOrigin(.5, 1);

        this.prefix = prefix;
        this.startX = x;
    }

    playIdle() {
        this.anims.play(this.prefix);
    }

    playAction(frame) {
        
        this.anims.stop();
        this.setFrame(frame);

        let tl = this.scene.tweens.createTimeline();
        tl.add({
            targets: this,
            duration: 100,
            x: this.toX,
        });
        tl.add({
            targets: this,
            duration: 100,
            x: this.startX,
            onComplete: ()=>{
                this.setFrame(this.punchReadyFrame)
            }
        });
        tl.play();
    }

    // motion - visual
    // frame, move, wait, back, idle

    attack() {
        this.playAction(this.punchWinFrame);
    }
    

    defend(blocked) {
        let frame = blocked ? this.punchLoseFrame : this.hitFrame;
        this.playAction(frame);
        if (!blocked)
            this.flash(0xCCCCCC, 150);
    }

    flash(tint, time) {

        this.clearTint();
        this.setTintFill(tint);

        this.scene.time.addEvent({
            delay: time,
            callback: ()=>{
                this.clearTint();
            }
        });
    }

    resetPosition() {
        this.x = this.startX;
    }
    
    setSprite(prefix) {

        this.prefix = prefix;

        let frame = `spr_${prefix}_idle1`;
        let textureFrame = this.scene.textures.getFrame(Text.SHEET, frame);

        this.sprite.setFrame(model.frame);
        this.sprite.setSize(textureFrame.width, textureFrame.height);
        this.sprite.refreshBody();
    }

    get punchReadyFrame() { return `spr_${this.prefix}_attack1`; }
    get punchLoseFrame() { return `spr_${this.prefix}_attack2`; }
    get punchWinFrame() { return `spr_${this.prefix}_attack3`; }
    get hitFrame() { return `spr_${this.prefix}_jump3`; }
    get toX() { return this.startX + (this.flipX ? - 8 : 8) }
}