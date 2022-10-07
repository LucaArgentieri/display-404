import Phaser from "phaser";
import { sceneEvents } from '../events/EventsCenter'

export default class GameUI extends Phaser.Scene {
    constructor() {
        super("game-ui");
        this.count = 0

    }
    preload() {
        this.size = {
            width: this.cameras.main.width,
            height: this.cameras.main.height
        }
    }
    create() {

        // //Progress Bar
        this.progressBox = this.add.graphics();
        this.progressBar = this.add.graphics();



        this.progressBar.fillStyle(0x0000ff, 1);
        this.progressBar.fillRect(10, 10, 0, 15);
        this.progressBox.fillStyle(0xffffff, 0.5);
        this.progressBox.fillRect(10, 10, 110, 15);

        //Text
        this.label = this.add.text(0, 0, 'XXX', { fontFamily: " sans-serif", fill: '#0000ff' }).setResolution(8);
        this.label2 = this.add.text(0, 0, 'XXX', { fontFamily: " sans-serif", fill: '#ffffff' }).setResolution(8);

        Phaser.Display.Align.In.TopLeft(this.label, this.add.zone(this.size.width / 2 + 100, this.size.height / 2 + 15, this.size.width, this.size.height))
        Phaser.Display.Align.In.TopLeft(this.label2, this.add.zone((this.size.width / 2 + 100 - 1), this.size.height / 2 + 15, this.size.width, this.size.height))


        //Fullscreen
        this.fullButton = this.add.image(0, 0, 'fullscreen', 0).setInteractive();
        Phaser.Display.Align.In.TopRight(this.fullButton, this.add.zone(this.size.width / 2, this.size.height / 2 - 15, this.size.width, this.size.height))
        this.fullButton.scale = 0.25

        this.fullButton.on('pointerup', function () {
            if (this.scale.isFullscreen) {
                this.fullButton.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                this.fullButton.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);

        var FKey = this.input.keyboard.addKey('F');
        FKey.on('down', function () {
            if (this.scale.isFullscreen) {
                this.fullButton.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                this.fullButton.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);


        //Create Sounds
        this.sounds = [
            this.sound.add('Collect1'),
            this.sound.add('Collect2'),
            this.sound.add('Collect3'),
            this.sound.add('Collect4'),
            this.sound.add('Collect5'),
            this.sound.add('Collect6'),
            this.sound.add('Collect7'),
            this.sound.add('Collect8'),
            this.sound.add('Collect9'),
            this.sound.add('Collect10'),
            this.sound.add('Collect11'),
            this.sound.add('Collect12'),
        ]

        sceneEvents.on('item-collected', this.updateItems, this)
    }
    updateItems() {
        this.count++

        this.progressBar.clear();
        this.progressBar.fillStyle(0x0000ff, 1);
        this.progressBar.fillRect(10, 10, 10 * this.count, 15);


        this.sounds[this.count].play()
        if (this.count >= 11) {
            this.sounds[11].on('complete', () => {
                window.open("https://www.display.design/", "_blank");
            })
        }





    }
    update() { }
}


