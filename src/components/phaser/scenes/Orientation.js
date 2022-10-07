import Phaser from "phaser";
import { sceneEvents } from "../events/EventsCenter";
import { checkOrientation } from "../utils/checkOrientation";

export default class Orientation extends Phaser.Scene {
    constructor() {
        super("orientation");
    }

    preload() {
    }

    create() {
        let size = {
            width: this.cameras.main.width,
            height: this.cameras.main.height
        }

        //Set background color
        this.cameras.main.setBackgroundColor('0E2FFF')


        //Create message and image
        this.message = this.add.text(0, 0, 'Please rotate to landscape\nfor better experience.', { font: "24px sans-serif", fill: '#ffffff', align: "center" }).setResolution(8);
        Phaser.Display.Align.In.Center(this.message, this.add.zone(size.width / 2, size.height / 2, size.width, size.height))


        this.rotatePhone = this.add.image(0, 0, 'rotatePhone')
        this.rotatePhone.setScale(0.02)
        Phaser.Display.Align.In.Center(this.rotatePhone, this.add.zone(size.width / 2, size.height / 2 + 80, size.width, size.height))

        this.tweens.add({
            targets: this.rotatePhone,
            angle: 90,
            ease: 'Power1',
            duration: 3000,
            repeat: -1,
        });



        //Check orientation
        this.scale.orientation === Phaser.Scale.LANDSCAPE && this.hideText()
        this.scale.on('orientationchange', checkOrientation, this);

        //Listen for orientation change
        sceneEvents.on('setMessageVisible', this.showText, this)
        sceneEvents.on('setMessageInvisible', this.hideText, this)


    }

    showText() {
        this.message.setVisible(true);
    }

    hideText() {
        this.message.setVisible(false);
        this.scene.start("main-menu");
    }
}
