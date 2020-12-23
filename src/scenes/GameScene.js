import Player from '../classes/Player.js';
import ActionArea from '../classes/ActionArea.js';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    init (data) {
        this.mapName = data.mapName;
    }

    preload () {
        this.load.tilemapTiledJSON(this.mapName, "assets/" + this.mapName + ".json");
    }

    create () {
        this.createMap();
        this.createPlayer();
        this.createActionAreas();
        this.setCamera();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.sys.events.on("wake", () => {
            this.input.keyboard.resetKeys()
        })
    }

    update () {
        this.player.update(this.cursors);
    }


    createMap () {
        this.map = this.make.tilemap({ key: this.mapName });
        this.tileset = this.map.addTilesetImage("base", "base");
        this.map.createStaticLayer("Under1", this.tileset, 0, 0);
        this.map.createStaticLayer("Under2", this.tileset, 0, 0);

        this.layerCollides = this.map.createStaticLayer("Collides", this.tileset, 0, 0);
        this.layerCollides.setCollisionByExclusion(-1, true);

        this.layerOver = this.map.createStaticLayer("Over", this.tileset, 0, 0);
        this.layerOver.depth = 10

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    createPlayer () {
        let spawnPoint = this.map.findObject("Objects", obj => obj.name === "PlayerStart");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    }

    createActionAreas () {
        this.actionAreas = this.physics.add.group()

        this.map.filterObjects("Objects", (obj) => {
            if (obj.type !== "Interaction") {
                return false;
            }

            let actionArea = new ActionArea(this, obj);
            this.actionAreas.add(actionArea);

            return true;
        });
    }

    setCamera () {
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setZoom(2);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }
}

export default GameScene;
