import Phaser from 'phaser';
import Preload from './scenes/Preload';
import Background from './scenes/Background';
import Game from './scenes/Game';
import Menu from './scenes/Menu';
import Pause from './scenes/Pause';

let CWIDTH = 640;
let CHEIGHT = 320;

const width = innerWidth;
const height = innerHeight;
const ratio = width / height;
const newWidth = Math.ceil(CHEIGHT * ratio);
CWIDTH = (ratio > 2) ? newWidth : CWIDTH;

const config = {
    type: Phaser.AUTO,
    pixelArt: false,
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: CWIDTH,
        height: CHEIGHT,
        parent: 'phaser-game',
    },
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    scene: [
        Preload,
        Background,
        Game,
        Menu,
        Pause
    ]
};

const game = new Phaser.Game(config);
