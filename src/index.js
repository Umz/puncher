import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}

//  Dimensions for this game:
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
        MyGame
    ]
};

const game = new Phaser.Game(config);
