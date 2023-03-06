import Phaser from 'phaser';
import Preload from './scenes/Preload';
import Background from './scenes/Background';
import Game from './scenes/Game';
import Menu from './scenes/Menu';
import Pause from './scenes/Pause';
import Value from './common/Value';

const width = innerWidth;
const height = innerHeight;
const ratio = width / height;
const newWidth = Math.ceil(Value.HEIGHT * ratio);
Value.WIDTH = (ratio > 2) ? newWidth : Value.WIDTH;

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: '#5d9ce8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Value.WIDTH,
        height: Value.HEIGHT,
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
