import Phaser from "phaser";

export default class Credits extends Phaser.Scene {
    constructor() {
        super("credits");
    }

    preload() {
    }

    create() {
        let size = {
            width: this.cameras.main.width,
            height: this.cameras.main.height
        }

        this.backToMenu = this.add.text(0, 0, 'X', { fontFamily: "sans-serif", fill: '#ffffff' }).setResolution(8);
        Phaser.Display.Align.In.TopRight(this.backToMenu, this.add.zone(size.width / 2 - 25, size.height / 2 + 25, size.width, size.height))
        this.backToMenu.setInteractive({ cursor: 'pointer' })

        this.textures = this.add.text(0, 0, 'Textures: LimeZu', { fontFamily: "sans-serif", fill: '#ffffff' }).setResolution(8);
        Phaser.Display.Align.In.Center(this.textures, this.add.zone(size.width / 2, size.height / 2, size.width, size.height))
        this.textures.setInteractive({ cursor: 'pointer' })

        this.sounds = this.add.text(0, 0, 'Sounds: Noba', { fontFamily: "sans-serif", fill: '#ffffff' }).setResolution(8);
        Phaser.Display.Align.In.Center(this.sounds, this.add.zone(size.width / 2, size.height / 2 + 25, size.width, size.height))
        this.sounds.setInteractive({ cursor: 'pointer' })

        this.backToMenu.on('pointerdown', () => {
            this.scene.start("main-menu");
        })

        this.backToMenu.on('pointerover', () => {
            this.backToMenu.setAlpha(0.8)
        })

        this.backToMenu.on('pointerout', () => {
            this.backToMenu.setAlpha(1)
        })

        this.textures.on('pointerdown', () => {
            window.open('https://limezu.itch.io/', '_blank');
        })

        this.textures.on('pointerover', () => {
            this.textures.setAlpha(0.8)
        })

        this.textures.on('pointerout', () => {
            this.textures.setAlpha(1)
        })

        this.sounds.on('pointerdown', () => {
            window.open('https://www.instagram.com/noba.nwm/', '_blank');
        })

        this.sounds.on('pointerover', () => {
            this.sounds.setAlpha(0.8)
        })

        this.sounds.on('pointerout', () => {
            this.sounds.setAlpha(1)
        })

    }
}


