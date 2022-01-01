export default class ActionArea extends Phaser.GameObjects.Zone {
    constructor(scene, obj) {
        super(scene, obj.x, obj.y, obj.width, obj.height);
        this.setOrigin(0, 0);

        this.obj = obj;
        this.name = obj.name;
        this.type = obj.type;

        this.scene = scene;
        scene.add.existing(this);

        this.eventData = this.scene.sceneConfig.getData(this.name);

        this.active = false;
        scene.physics.add.overlap(scene.player, this, this.performAction, false, this);
        scene.physics.add.overlap(scene.player.interactionZone, this, this.playerInteraction);
    }

    playerInteraction (playerInteractionZone, zone) {
        let properties = zone.eventData.getProperties();

        if (!properties.disableZ && zone.scene.keyZ.isDown) {
            zone.performAction(zone.scene.player, zone, true)
        }
    }

    performAction (player, zone, force = false) {
        // Note: zone === this
        if (player.interactingWithActionArea && !force) {
            return;
        }

        if (!this.eventData.beforeAction()) {
            return;
        }

        let properties = this.eventData.getProperties();

        if (this.type === "Interaction") {
            this.scene.scene.pause()
            this.scene.scene.run('BoardScene', {
                oldScene: this.scene,
                actionArea: this
            });
        } else if (this.type === "Notification") {
            this.scene.showNotification(properties.text)
        } else if (this.type === "Portal") {
            this.scene.camera.fadeOut(300, 0, 0, 0, (c, progress) => {
                if (progress >= 0.9) {
                    this.scene.scene.start('GameScene', {
                        mapName: this.name,
                        playerStart: this.scene.mapName
                    });
                }
            })
        }

        player.interactingWithActionArea = this.name;
    }
}
