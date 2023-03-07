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
    
    punchAttack(isWin) {
        this.anims.stop();
        this.setFrame(isWin ? this.punchWinFrame : this.hitFrame);

        let dir = (this.flipX) ? -8 : 8;
        this.x = this.startX + dir;

        if (!isWin)
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
}