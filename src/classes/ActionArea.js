import actionAreas from '../actionAreas.js'

export default class ActionArea extends Phaser.GameObjects.Zone {
    constructor(scene, obj) {
        super(scene, obj.x, obj.y, obj.width, obj.height);
        this.setOrigin(0, 0);

        this.obj = obj;
        this.name = obj.name;
        this.type = obj.type;

        this.scene = scene;
        scene.add.existing(this);

        this.active = false;
        scene.physics.add.overlap(scene.player, this, this.performAction, false, this);
    }

    performAction (player, zone) {
        // Note: zone === this
        if (player.interactingWithActionArea)
            return;

        let jsonKey = this.scene.mapName + "." + zone.name;
        let properties = actionAreas[jsonKey]

        if (this.type === "Interaction") {
            this.scene.scene.pause()
            this.scene.scene.run('BoardScene', {
                ...properties,
                key: jsonKey
            })
        } else if (this.type === "Notification") {
            this.scene.showNotification(properties.text)
        } else if (this.type === "Portal") {
            this.scene.camera.fadeOut(300, 0, 0, 0, (c, progress) => {
                if (progress >= 0.9) {
                    this.scene.scene.start('GameScene', {
                        mapName: zone.name,
                        playerStart: this.scene.mapName
                    });
                }
            })
        }

        player.interactingWithActionArea = this.name;
    }
}
