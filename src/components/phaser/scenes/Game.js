import Phaser from "phaser";
import { sceneEvents } from '../events/EventsCenter'



export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
        this.speed = 100
        this.device = null
    }

    preload() {
        this.device = this.sys.game.device.os.desktop

        this.url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', this.url, true);


        this.cursors = this.input.keyboard.createCursorKeys();
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })

        this.mobileKeys = {
            leftKeyDown: false,
            rightKeyDown: false,
            upKeyDown: false,
            downKeyDown: false,
        }

    }
    create() {
        this.size = {
            width: this.cameras.main.width,
            height: this.cameras.main.height
        }

        this.scene.run('game-ui')
        this.scene.run('controls')

        this.OverthinkerAudio = this.sound.add('Overthinker', { volume: 0.2 });
        this.RetrowaveAudio = this.sound.add('Retrowave', { volume: 0.2 });
        this.OverthinkerAudio.play();


        this.OverthinkerAudio.on('complete', () => {
            this.RetrowaveAudio.play();
        })
        this.RetrowaveAudio.on('complete', () => {
            this.OverthinkerAudio.play();
        })





        //Map
        const map = this.make.tilemap({ key: "DisplayMap" });
        const tileset = map.addTilesetImage("assets", "assets", 16, 16);
        map.createLayer("Ground", tileset, 0, 0).setDepth(0);
        map.createLayer("Parallax-Ground", tileset, 0, 0).setDepth(0.1);
        map.createLayer("Parallax", tileset, 0, 0).setDepth(0.3);
        map.createLayer("Parallax-Walls", tileset, 0, 0).setDepth(0.4);
        const wallsLayer = map.createLayer("Walls", tileset).setDepth(0.1)
        wallsLayer.setCollisionByProperty({ collides: true });



        //Collectables
        let collectable = this.physics.add.staticGroup().setDepth(1)
        let collectablesLayer = map.getObjectLayer('Collectables')
        collectablesLayer.objects.forEach(object => {
            collectable.get(object.x, object.y, 'collectable')
        })


        this.adam = this.physics.add.sprite(900, 300, "adam").setDepth(0.2);
        this.adam.body.setSize(this.adam.width, this.adam.height)
        this.anims.create({
            key: "adam_run_front_idle",
            frames: [{ key: "adam", frame: "adam_run_front_idle" }],
        })
        this.anims.create({
            key: "adam_run_back_idle",
            frames: [{ key: "adam", frame: "adam_run_back_idle" }],
        })
        this.anims.create({
            key: "adam_run_left_idle",
            frames: [{ key: "adam", frame: "adam_run_left_idle" }],
        })
        this.anims.create({
            key: "adam_run_right_idle",
            frames: [{ key: "adam", frame: "adam_run_right_idle" }],
        })
        this.anims.create({
            key: "adam_run_front",
            frames: this.anims.generateFrameNames('adam', { start: 1, end: 6, prefix: 'adam_run_front-' }),
            repeat: -1,
            frameRate: 15
        })
        this.anims.create({
            key: "adam_run_back",
            frames: this.anims.generateFrameNames('adam', { start: 1, end: 6, prefix: 'adam_run_back-' }),
            repeat: -1,
            frameRate: 15
        })
        this.anims.create({
            key: "adam_run_left",
            frames: this.anims.generateFrameNames('adam', { start: 1, end: 6, prefix: 'adam_run_left-' }),
            repeat: -1,
            frameRate: 15
        })
        this.anims.create({
            key: "adam_run_right",
            frames: this.anims.generateFrameNames('adam', { start: 1, end: 6, prefix: 'adam_run_right-' }),
            repeat: -1,
            frameRate: 15
        })
        this.adam.anims.play('adam_run_front_idle')



        //Dogs
        const bobby = this.physics.add.image(1050, 500, 'bobby').setDepth(0.2)
        const soja = this.physics.add.image(1100, 550, 'soja').setDepth(0.2)

        bobby.setScale(0.1)
        bobby.body.bounce.x = 1
        bobby.body.bounce.y = 1
        bobby.body.acceleration.x = 50
        bobby.body.acceleration.y = 50

        soja.setScale(0.1)
        soja.body.bounce.x = 1
        soja.body.bounce.y = 1
        soja.body.acceleration.x = 50
        soja.body.acceleration.y = 50




        //Collisions
        this.collisionSound = this.sound.add('Collision')
        this.isColliding = false

        this.physics.add.collider(this.adam, [bobby, soja])
        this.physics.add.collider([bobby, soja], wallsLayer)
        this.physics.add.collider(bobby, soja)
        this.physics.add.collider(this.adam, wallsLayer, () => {
            if (!this.isColliding) {
                this.collisionSound.play()
                this.isColliding = true
                setTimeout(() => {
                    this.isColliding = false
                }, 500)
            }
        })
        this.physics.add.overlap(this.adam, collectable, this.collectStairs, null, this)



        //Camera
        this.cameras.main.startFollow(this.adam, true);


        //Events
        window.addEventListener('resize', this.joystickMovement())

    }


    collectStairs(player, stairs) {
        stairs.disableBody(true, true)
        sceneEvents.emit('item-collected')

        //Particles Effect when collect x
        let particles = this.add.particles('blueB').setDepth(0.09);
        let emitter = particles.createEmitter({
            speed: 50,
            scale: { start: 0.15, end: 0.1 },
            // blendMode: 'ADD'
        });

        emitter.startFollow(this.adam);


        setTimeout(() => {
            emitter.stopFollow()
            // emitter.visible = false;
        }, 1000)




    }

    joystickMovement() {
        this.device = this.sys.game.device.os.desktop
        if (!this.device) {
            //Joystick
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                radius: 50,
                x: 100,
                y: (window.innerHeight / 2) + 25,
                base: this.add.circle(0, 0, 30, '', 0x888888).setDepth(0.3),
                thumb: this.add.circle(0, 0, 15, '', 0xcccccc).setDepth(0.4),
                dir: '4dir',
                singleDirection: true,
                maxDistanceInPixels: 50,
                device: 1, // 0 for mouse pointer (computer), 1 for touch pointer (mobile)
            })


            this.input.on('pointerdown', function (pointer) {
                this.joyStick.setPosition(pointer.x, pointer.y);
            }, this)


            this.joyStick.on('update', (e) => {
                var cursorKeys = this.joyStick.createCursorKeys();
                this.leftKeyDown = cursorKeys.left.isDown;
                this.rightKeyDown = cursorKeys.right.isDown;
                this.upKeyDown = cursorKeys.up.isDown;
                this.downKeyDown = cursorKeys.down.isDown;
            });


        }

    }



    update() {
        if (!this.cursors || !this.adam) {
            return
        }


        //Mobile controls
        if (!this.device) {
            this.adam.setVelocity(0, 0);
        }


        //Keyboard controls
        if (this.inputKeys.left.isDown || this.cursors.left.isDown || this.leftKeyDown) {
            this.adam.play('adam_run_left', true)
            this.adam.setVelocity(-this.speed, 0);
        } else if (this.inputKeys.right.isDown || this.cursors.right.isDown || this.rightKeyDown) {
            this.adam.play('adam_run_right', true)
            this.adam.setVelocity(this.speed, 0)
        } else if (this.inputKeys.up.isDown || this.cursors.up.isDown || this.upKeyDown) {
            this.adam.play('adam_run_back', true)
            this.adam.setVelocity(0, -this.speed);
        } else if (this.inputKeys.down.isDown || this.cursors.down.isDown || this.downKeyDown) {
            this.adam.play('adam_run_front', true)
            this.adam.setVelocity(0, this.speed);
        }
        else {
            const parts = this.adam.anims.currentAnim.key.split('_')
            if (parts[3] === 'idle') {
                return
            } else {
                this.adam.play((this.adam.anims.currentAnim.key + "_idle"))
            }
            this.adam.setVelocity(0, 0)

        }

    }

}
