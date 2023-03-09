const Text = {

    //  HTML

    DOM_LOGO: "logo-container",
    DOM_MENU: "menu-container",
    DOM_HOW: "how-container",
    DOM_CREDITS: "credits-container",
    DOM_HUD: "hud-container",
    DOM_CHOICES: "select-container",
    DOM_CHOICES_BUTTONS: "select-choices",

    MENU_SELECTED: "menu-active",
    MENU_ITEMS: "menu-item",
    MENU_POPUP: "popup-menu",

    MENU_PLAY: "menu-play",
    MENU_HOW: "menu-how",
    MENU_CREDITS: "menu-credits",
    MENU_EXIT: "menu-exit",

    CHOICE_TITLE: "choice-title",
    CHOICE_SUBTITLE: "choice-subtitle",
    CHOICE_LEFT: "choice-left",
    CHOICE_RIGHT: "choice-right",
    CHOICE_SELECTED: "choice-active",
    CHOICE_ITEM: "choice-item",

    TITLE_NEXT: "Keep Going",
    TITLE_RETRY: "Try Again.",
    TITLE_QUIT: "Stop Here?",
    SUBTITLE_NEXT: "Next opponent incoming..",
    SUBTITLE_RETRY: "You almost had it",

    HUD_ARROW_LEFT: "hud-arrow-left",
    HUD_ARROW_RIGHT: "hud-arrow-right",

    HUD_HEALTH: "hud-health",
    HUD_PLAYER_HP: "hp-player",
    HUD_OPPONENT_HP: "hp-opponent",
    HUD_ROUND: "hud-round",

    HUD_READY: "hud-ready",
    HUD_FEEDBACK: "hud-feedback",

    HUD_HIT: "Hit",
    HUD_BLOCK: "Block",

    //  Scenes

    PRELOAD: "Preload",
    BACKGROUND: "Background",
    GAME: "Game",
    MENU: "Menu",
    PAUSE: "Pause",

    //  File Loading

    ASSET_PATH: "./src/assets/",

    //  Sprites

    SHEET: "allsheet",

    BG_CLOUD: "bg_clouds",
    BG_STATUE: "bg_statue",
    BG_ROCK1: "part_rock1",
    BG_ROCK2: "part_rock2",

    FG_PLATFORM: "fg_platform",
    FX_SPARK: "fx_hit",
    FX_PUFF: "fx_puff",

    TX_WIND: "wind-circle",

    SPR_TOLU: "tolu",

    //  Emitters

    EMIT_WIND: "wind-emitter",
    EMIT_DUST: "dust-emitter",
    EMIT_PLATFORM: "falling-rocks-emitter",

    EMIT_HIT_RIGHT: "hit-fly-right",
    EMIT_HIT_LEFT: "hit-fly-left",

    //  Events

    EVENT_NEXT_STATE: "game-flow-next-state",
    EVENT_ATTACK: "player-attack",
    EVENT_DEFEND: "player-defend",
    EVENT_HIT: "player-hit",

    //  Sounds

    SND_MENU_MOVE: "menu_move.ogg",
    SND_MENU_CLICK: "menu_click.ogg",
    SND_MENU_PLAY: "menu_play.ogg",
}
export default Text;