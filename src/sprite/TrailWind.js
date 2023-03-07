import Phaser from "phaser";
import Text from "../common/Text";
import Value from "../common/Value";
import Counter from "../util/Counter";

export default class TrailWind extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x = 0, y = 0) {
        super(scene, x, y, Text.TX_WIND);
        this.setDepth(Value.DEPTH_WIND_PARTICLE);
        this.setAlpha(.5);
        this.counter = new Counter().setMaxCount(2500).setRepeating(true);
    }

    update(time, delta) {
        let windSpeed = Value.WIDTH * .07;
        this.setVelocityX(-windSpeed);
        if (this.counter.updateAndCheck(time, delta)) {
            let mul = Math.random() > .5 ? 1 : -1;
            this.setVelocityY((windSpeed * .15) * mul);
            this.setRandomPosition(0, 0, Value.WIDTH, Value.HEIGHT * .5);
        }
    }
    
}