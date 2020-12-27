import Player from '../classes/Player.js';
import ActionArea from '../classes/ActionArea.js';
import store from '../store';
import baseActionAreaConfig from '../sceneData/index.js';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    init (data) {
        this.mapName = data.mapName;
        this.playerStart = data.playerStart;

        this.store = store;
        this.actionAreaConfig = baseActionAreaConfig[this.mapName]
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

        let img = this.add.image(216, 186, 'menu')
            .setScrollFactor(0)
            .setDepth(20)
            .setDisplaySize(24, 24)
            .setInteractive();

        img.on('pointerover', () => {
            img.displayWidth = 28;
            img.displayHeight = 28;
        });
        img.on('pointerout', () => {
            img.displayWidth = 24;
            img.displayHeight = 24;
        });
        img.on('pointerup', () => {
            this.scene.pause()
            this.scene.run('MenuScene', this)
        });
    }

    update () {
        this.player.update(this.cursors);
    }

    showNotification (text) {
        let screenCenterX = 32*12
        let screenCenterY = 32*14
        if (this.notificationText) {
            this.notificationText.setText(text).setVisible(true);

            if (this.notificationTimeout) {
                clearTimeout(this.notificationTimeout);
            }
        } else {
            this.notificationText = this.add.text(screenCenterX, screenCenterY, text, {
                    backgroundColor: "#eeddbb",
                    color: "#663300",
                    padding: { x: 20, y: 8 }
                })
                .setDepth(20)
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0);
        }

        this.notificationTimeout = setTimeout(() => {
            this.notificationText.destroy();
            this.notificationText = null;
            this.notificationTimeout = null;
        }, 2000)
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
        let spawnPoint = null;
        if (Array.isArray(this.playerStart)) {
            spawnPoint = {
                x: this.playerStart[0],
                y: this.playerStart[1]
            }
        } else {
            spawnPoint = this.map.findObject("Objects", obj => obj.name === this.playerStart && obj.type === "Spawn");
        }

        this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    }

    createActionAreas () {
        this.actionAreas = this.physics.add.group()

        this.map.filterObjects("Objects", (obj) => {
            if (!["Spawn"].includes(obj.type)) {
                let actionArea = new ActionArea(this, obj);
                this.actionAreas.add(actionArea);
                return true;
            }

            return false;
        });
    }

    setCamera () {
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setZoom(2);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    // ActionAreaHelpers

    beforeAction (zone) {
        if (
            this.actionAreaConfig[zone.name] &&
            this.actionAreaConfig[zone.name].beforeAction
        ) {
            return this.actionAreaConfig[zone.name].beforeAction.apply(this);
        }

        return true;
    }

    getProperties (zone) {
        if (
            this.actionAreaConfig[zone.name] &&
            this.actionAreaConfig[zone.name].properties != null
        ) {
            return this.actionAreaConfig[zone.name].properties
        }

        // Required to prevent caching(?) at BoardScene.init
        return {}
    }
}

export default GameScene;
