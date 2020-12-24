class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
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

        this.load.image('cross', 'assets/cross.svg')
        this.load.image('bg', 'assets/bg.png')

        this.load.json('actionAreas', 'assets/action_areas.json');
    }

    create () {
    }
}

export default BootScene;
