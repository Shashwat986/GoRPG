export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, obj) {
        let config = scene.sceneConfig.getData(obj.name).getProperties();

        super(scene, obj.x, obj.y, config.spritesheet, 1);
        this.scene = scene;
        this.name = obj.name;
        this.sceneConfig = scene.sceneConfig.getData(obj.name);

        this.spritesheet = config.spritesheet;

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.createAnims();

        this.depth = 5;
        this.body.setCollideWorldBounds(true);

        scene.physics.add.collider(this, scene.layerCollides);
        scene.physics.add.collider(scene.player, this);
        scene.physics.add.overlap(scene.player.interactionZone, this, this.playerCollision);

        if (config.randomWalk) {
            scene.time.addEvent({
                delay: 3000,
                callback: () => this.step(),
                loop: true
            })
        }

        // Not sure why, but required to make NPCs immovable
        scene.time.delayedCall(0, () => this.body.setImmovable(true));
    }

    playerCollision (player, npc) {
        if (npc.scene.keyZ.isDown) {
            npc.sceneConfig.onInteract();
        }
        npc.body.setVelocity(0)
    }

    step (x = null, y = null) {
        if (x == null || y == null) {
            let arg = [[0,0], [0, -1], [0, 1], [1,0], [-1, 0]][Math.floor(Math.random() * 5)]
            x = arg[0]
            y = arg[1]
        }

        this.body.setVelocity(x * 300, y * 300);
        this.scene.time.delayedCall(120, () => {
            this.body.setVelocity(0)
            this.animate();
        });

        this.animate(x, y);
    }

    createAnims () {
        this.scene.anims.create({
            key: this.spritesheet + "left",
            frames: this.scene.anims.generateFrameNumbers(this.spritesheet, { frames: [3,4,5] }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.spritesheet + "right",
            frames: this.scene.anims.generateFrameNumbers(this.spritesheet, { frames: [6,7,8] }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.spritesheet + "up",
            frames: this.scene.anims.generateFrameNumbers(this.spritesheet, { frames: [9,10,11] }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.spritesheet + "down",
            frames: this.scene.anims.generateFrameNumbers(this.spritesheet, { frames: [0,1,2] }),
            frameRate: 10,
            repeat: -1
        });
    }

    animate (x, y) {
        if (x < 0) {
            this.anims.play(this.spritesheet + 'left', true)
        } else if (x > 0) {
            this.anims.play(this.spritesheet + 'right', true)
        } else if (y < 0) {
            this.anims.play(this.spritesheet + 'up', true)
        } else if (y > 0) {
            this.anims.play(this.spritesheet + 'down', true);
        } else {
            this.anims.stop();
        }

    }
}
