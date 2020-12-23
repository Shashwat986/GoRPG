export default class ActionArea extends Phaser.GameObjects.Zone {
    constructor(scene, obj) {
        super(scene, obj.x, obj.y, obj.width, obj.height);
        this.setOrigin(0, 0);

        this.obj = obj;
        this.name = obj.name;
        this.type = obj.type;

        this.scene = scene;
        scene.add.existing(this);

        scene.physics.add.overlap(scene.player, this, this.performAction, false, this);
    }

    performAction (player, zone) {
        switch (zone.name) {
            case 'OpenBoard1':
                this.scene.scene.pause()
                this.scene.scene.run('BoardScene')
                break;
            case 'OpenBoard2':
                this.scene.scene.pause()
                this.scene.scene.run('BoardScene')
                break;
            case 'OpenBoard3':
                this.scene.scene.pause()
                this.scene.scene.run('BoardScene')
                break;
        }
    }
}
