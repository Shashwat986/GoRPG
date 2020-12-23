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
        if (player.interactingWithActionArea)
            return;

        let jsonKey = this.scene.mapName + "." + zone.name;
        let properties = this.scene.cache.json.get('actionAreas')[jsonKey]

        this.scene.scene.pause()
        this.scene.scene.run('BoardScene', properties)

        player.interactingWithActionArea = this.name;
    }
}
