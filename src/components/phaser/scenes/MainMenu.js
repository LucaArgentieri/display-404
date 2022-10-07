import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("main-menu");
    }
    preload() { }
    create() {
        let size = {
            width: this.cameras.main.width,
            height: this.cameras.main.height
        }

        this.cameras.main.setBackgroundColor('0E2FFF')
        this.subtitle = this.add.text(0, 0, 'XXX', { fontFamily: "sans-serif", fill: '#ffffff' }).setResolution(8);
        Phaser.Display.Align.In.Center(this.subtitle, this.add.zone(size.width / 2, size.height / 2 - 30, size.width, size.height))
        this.label = this.add.text(0, 0, 'Sorry, something went wrong', { fontFamily: "sans-serif", fill: '#ffffff' }).setResolution(8);
        Phaser.Display.Align.In.Center(this.label, this.add.zone(size.width / 2, size.height / 2, size.width, size.height))
        this.button = this.add.text(0, 0, 'Fix it', { fontFamily: "sans-serif", fill: '#0E2FFF', padding: 5 }).setResolution(8);
        this.button.setInteractive({ cursor: 'pointer' })
        Phaser.Display.Align.In.Center(this.button, this.add.zone(size.width / 2, size.height / 2 + 30, size.width, size.height))
        this.button.setAlign('center')
        this.button.setBackgroundColor('#ffffff')

        this.credits = this.add.text(0, 0, 'Credits', { fontFamily: "sans-serif", fill: '#ffffff' }).setResolution(8);
        Phaser.Display.Align.In.BottomCenter(this.credits, this.add.zone(size.width / 2, size.height / 2 - 15, size.width, size.height))
        this.credits.setInteractive({ cursor: 'pointer' })

        //Button event
        this.button.on('pointerdown', () => {
            this.scene.start("game");
        })

        this.button.on('pointerover', () => {
            this.button.setAlpha(0.8)
        })

        this.button.on('pointerout', () => {
            this.button.setAlpha(1)
        })

        this.credits.on('pointerdown', () => {
            this.scene.start("credits");
        })

        this.credits.on('pointerover', () => {
            this.credits.setAlpha(0.8)
        })

        this.credits.on('pointerout', () => {
            this.credits.setAlpha(1)
        })

    }




}
