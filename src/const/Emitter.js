import Text from "../common/Text";

const Emitter = {
    WIND: {
        atlas: Text.TX_WIND,
        frame: null,
        depth: 1,
        emitterConfig: {
            scaleX: {start: 1, end: 0 },
            scaleY: {start: 1, end: 0 },
            alpha: { start: .5, end: 0 },
            lifespan: 1500,
            frequency: 50
        }
    }
}
export default Emitter;