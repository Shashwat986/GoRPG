import store from '../store';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });

        window.GlobalConfig.scene = this;
    }
    preload() {
        this.store = store;
        // Progress Bar
        const progress = this.add.graphics();
        this.add.text(32*7, 32*8, "Loading... Please Wait", {
            fontSize: "24px"
        });

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0x000000, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            if (this.store.state.synced) {
                this.scene.start('GameScene', {
                    mapName: this.store.state.mapName,
                    playerStart: [ this.store.state.playerX, this.store.state.playerY ]
                });
                return;
            }
            this.scene.start('GameScene', {
                mapName: "Start",
                playerStart: "PlayerStart"
            });
        });

        // Load Data
        this.load.spritesheet('base', 'assets/base.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('player', 'assets/player_sprite.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.getCharacterSpriteList().forEach((key) => {
            let name = key.substring(0, key.length - 4)
            this.load.spritesheet(name, 'assets/characterSprites/' + key, {
                frameWidth: 32,
                frameHeight: 32
            });
        });


        this.load.image('cross', 'assets/cross.svg')
        this.load.image('menu', 'assets/menu.png')
        this.load.image('bg', 'assets/bg.png')
    }

    create () {
    }

    getCharacterSpriteList () {
        return [
            "Cat 01-1.png",
            "Cat 01-2.png",
            "Cat 01-3.png",
            "Dog 01-1.png",
            "Dog 01-2.png",
            "Dog 01-3.png",
            "Female 01-1.png",
            "Female 01-2.png",
            "Female 01-3.png",
            "Female 01-4.png",
            "Female 02-1.png",
            "Female 02-2.png",
            "Female 02-3.png",
            "Female 02-4.png",
            "Female 03-1.png",
            "Female 03-2.png",
            "Female 03-3.png",
            "Female 03-4.png",
            "Female 04-1.png",
            "Female 04-2.png",
            "Female 04-3.png",
            "Female 04-4.png",
            "Female 05-1.png",
            "Female 05-2.png",
            "Female 05-3.png",
            "Female 05-4.png",
            "Female 06-1.png",
            "Female 06-2.png",
            "Female 06-3.png",
            "Female 06-4.png",
            "Female 07-1.png",
            "Female 07-2.png",
            "Female 07-3.png",
            "Female 07-4.png",
            "Female 08-1.png",
            "Female 08-2.png",
            "Female 08-3.png",
            "Female 08-4.png",
            "Female 09-1.png",
            "Female 09-2.png",
            "Female 09-3.png",
            "Female 09-4.png",
            "Female 10-1.png",
            "Female 10-2.png",
            "Female 10-3.png",
            "Female 10-4.png",
            "Female 11-1.png",
            "Female 11-2.png",
            "Female 11-3.png",
            "Female 11-4.png",
            "Female 12-1.png",
            "Female 12-2.png",
            "Female 12-3.png",
            "Female 12-4.png",
            "Female 13-1.png",
            "Female 13-2.png",
            "Female 13-3.png",
            "Female 13-4.png",
            "Female 14-1.png",
            "Female 14-2.png",
            "Female 14-3.png",
            "Female 14-4.png",
            "Female 15-1.png",
            "Female 15-2.png",
            "Female 15-3.png",
            "Female 15-4.png",
            "Female 16-1.png",
            "Female 16-2.png",
            "Female 16-3.png",
            "Female 16-4.png",
            "Female 17-1.png",
            "Female 17-2.png",
            "Female 17-3.png",
            "Female 17-4.png",
            "Female 18-1.png",
            "Female 18-2.png",
            "Female 18-3.png",
            "Female 18-4.png",
            "Female 19-1.png",
            "Female 19-2.png",
            "Female 19-3.png",
            "Female 19-4.png",
            "Female 20-1.png",
            "Female 20-2.png",
            "Female 20-3.png",
            "Female 20-4.png",
            "Female 21-1.png",
            "Female 21-2.png",
            "Female 21-3.png",
            "Female 21-4.png",
            "Female 22-1.png",
            "Female 22-2.png",
            "Female 22-3.png",
            "Female 22-4.png",
            "Female 23-1.png",
            "Female 24-1.png",
            "Female 25-1.png",
            "Male 01-1.png",
            "Male 01-2.png",
            "Male 01-3.png",
            "Male 01-4.png",
            "Male 02-1.png",
            "Male 02-2.png",
            "Male 02-3.png",
            "Male 02-4.png",
            "Male 03-1.png",
            "Male 03-2.png",
            "Male 03-3.png",
            "Male 03-4.png",
            "Male 04-1.png",
            "Male 04-2.png",
            "Male 04-3.png",
            "Male 04-4.png",
            "Male 05-1.png",
            "Male 05-2.png",
            "Male 05-3.png",
            "Male 05-4.png",
            "Male 06-1.png",
            "Male 06-2.png",
            "Male 06-3.png",
            "Male 06-4.png",
            "Male 07-1.png",
            "Male 07-2.png",
            "Male 07-3.png",
            "Male 07-4.png",
            "Male 08-1.png",
            "Male 08-2.png",
            "Male 08-3.png",
            "Male 08-4.png",
            "Male 09-1.png",
            "Male 09-2.png",
            "Male 09-3.png",
            "Male 09-4.png",
            "Male 10-1.png",
            "Male 10-2.png",
            "Male 10-3.png",
            "Male 10-4.png",
            "Male 11-1.png",
            "Male 11-2.png",
            "Male 11-3.png",
            "Male 11-4.png",
            "Male 12-1.png",
            "Male 12-2.png",
            "Male 12-3.png",
            "Male 12-4.png",
            "Male 13-1.png",
            "Male 13-2.png",
            "Male 13-3.png",
            "Male 13-4.png",
            "Male 14-1.png",
            "Male 14-2.png",
            "Male 14-3.png",
            "Male 14-4.png",
            "Male 15-1.png",
            "Male 15-2.png",
            "Male 15-3.png",
            "Male 15-4.png",
            "Male 16-1.png",
            "Male 16-2.png",
            "Male 16-3.png",
            "Male 16-4.png",
            "Male 17-1.png",
            "Male 17-2.png",
            "Male 17-3.png",
            "Male 17-4.png",
            "Male 18-1.png"
        ]
    }
}

export default BootScene;
