import Phaser from "phaser";

//Preloader Progress Bar
//https://www.html5gamedevs.com/topic/38333-audio-play-on-event/

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        //Tool for create atlas -> https://gammafp.com/tool/atlas-packer/ (you have to divide the atlas into different files)

        //Rotate Phone
        this.load.image('rotatePhone', 'images/rotatePhone.png');

        //Player
        this.load.atlas('adam', 'characters/adam.png', 'characters/adam_atlas.json');

        //Dogs
        this.load.image('bobby', 'characters/bobby.png');
        this.load.image('soja', 'characters/soja.png');

        //Tileset
        this.load.image("assets", 'tiles/esterior.png');
        this.load.tilemapTiledJSON("DisplayMap", 'tiles/DisplayMap.json');

        //Collectables
        this.load.image("collectable", 'tiles/16X.png');


        //Particles
        this.load.image('blueB', './particles/blueB.png');

        //Fullscreen
        this.load.spritesheet('fullscreen', 'images/fullscreen.png', { frameWidth: 64, frameHeight: 64 });


        //Audio
        this.load.audio('Overthinker', ['sounds/Overthinker-8-bit-Arragiamento.mp3']);
        this.load.audio('Retrowave', ['sounds/Retrowave8bit-Arrangiamento.mp3']);
        this.load.audio('Collect1', ['sounds/Collect1.mp3']);
        this.load.audio('Collect2', ['sounds/Collect2.mp3']);
        this.load.audio('Collect3', ['sounds/Collect3.mp3']);
        this.load.audio('Collect4', ['sounds/Collect4.mp3']);
        this.load.audio('Collect5', ['sounds/Collect5.mp3']);
        this.load.audio('Collect6', ['sounds/Collect6.mp3']);
        this.load.audio('Collect7', ['sounds/Collect7.mp3']);
        this.load.audio('Collect8', ['sounds/Collect8.mp3']);
        this.load.audio('Collect9', ['sounds/Collect9.mp3']);
        this.load.audio('Collect10', ['sounds/Collect10.mp3']);
        this.load.audio('Collect11', ['sounds/Collect11.mp3']);
        this.load.audio('Collect12', ['sounds/Collect12.mp3']);
        this.load.audio('Collision', ['sounds/Collisione.mp3']);



        this.progressBox = this.add.graphics();
        this.progressBar = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2, 200, 15);


        this.load.on('progress', (value) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2, 200 * value, 15);
        });

    }

    create() {
        this.scene.start(window.innerWidth > 900 ? "main-menu" : "orientation");
    }


}


