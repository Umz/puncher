import Text from "../common/Text";

const Sfx = {
    MENU_MOVE: { key: Text.SND_MENU_MOVE, config: {volume: 1} },
    MENU_CLICK: { key: Text.SND_MENU_CLICK, config: {volume: 1} },
    MENU_PLAY: { key: Text.SND_MENU_PLAY, config: {volume: 1} },

    GAME_START: { key: Text.SND_GAME_START, config: {volume: 1} },
    GAME_PUNCH: { key: Text.SND_GAME_PUNCH, config: {volume: 1} },
    GAME_BLOCK: { key: Text.SND_GAME_BLOCK, config: {volume: 1} },

    //MUS: Sfx.BGM_LEVEL, {volume: .3, loop:true, isMusic:true}
}
export default Sfx;