import Text from "../common/Text";

const Sfx = {

    MENU_MOVE: { key: Text.SND_MENU_MOVE, config: {volume: 1} },
    MENU_CLICK: { key: Text.SND_MENU_CLICK, config: {volume: 1} },
    MENU_PLAY: { key: Text.SND_MENU_PLAY, config: {volume: 1} },
    MENU_CLOSE: { key: Text.SND_MENU_CLOSE, config: {volume: 1} },

    GAME_START: { key: Text.SND_GAME_START, config: {volume: .3} },
    GAME_PUNCH: { key: Text.SND_GAME_PUNCH, config: {volume: 1} },
    GAME_BLOCK: { key: Text.SND_GAME_BLOCK, config: {volume: 1} },

    GAME_DIE1: { key: Text.SND_GAME_DIE1, config: {volume: .3} },
    GAME_DIE2: { key: Text.SND_GAME_DIE2, config: {volume: .3} },
    GAME_DIE3: { key: Text.SND_GAME_DIE3, config: {volume: .3} },
    GAME_DIE4: { key: Text.SND_GAME_DIE4, config: {volume: .3} },
    GAME_DIE5: { key: Text.SND_GAME_DIE5, config: {volume: .3} },

    GAME_WARP: { key: Text.SND_GAME_WARP, config: {volume: 1} },

    MUS_FIGHT: { key: Text.MUS_FIGHT, config: {volume: 1, music:true, loop:true} }
}
export default Sfx;