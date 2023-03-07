import Text from "../common/Text";
import Value from "../common/Value";

const Emitter = {
    WIND: {
        atlas: Text.TX_WIND,
        frame: null,
        depth: Value.DEPTH_WIND_PARTICLE,
        emitterConfig: {
            scaleX: {start: 1, end: 0 },
            scaleY: {start: 1, end: 0 },
            alpha: { start: .5, end: 0 },
            lifespan: 1500,
            frequency: 50
        }
    },
    DUST: {
        atlas: Text.SHEET,
        frame: Text.BG_ROCK2,
        depth: Value.DEPTH_DUST_PARTICLE,
        emitterConfig: {
            speedX: { min: -40, max: -2 },
            speedY: { min: -24, max: -8 },
            alpha: { start: .5, end: 0 },
            rotate: { start: 0, end: 360, rotate: true },
            lifespan: 2500,
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, 0, Value.WIDTH, Value.HEIGHT) },
            frequency: 500
        }
    },
    PLATFORM: {
        atlas: Text.SHEET,
        frame: Text.BG_ROCK1,
        //frame: { frames: [ Text.BG_ROCK1, Text.BG_ROCK2 ] },
        depth: Value.DEPTH_PLATFORM_PARTICLE,
        emitterConfig: {
            speedY: { min: 1, max: 12 },
            gravityY: 120,
            lifespan: 2500,
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, 0, Value.PLATFORM_WIDTH * 2, 8) },
            frequency: 1200
        }
    }
}
export default Emitter;