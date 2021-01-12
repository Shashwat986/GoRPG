class MenuScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MenuScene',
            cameras: {
                backgroundColor: 'rgba(0,0,0,0.5)'
            }
        });

        window.GlobalConfig.scene = this;
    }

    init (oldScene) {
        this.oldScene = oldScene;
    }

    preload () {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }

    create () {
        this.input.keyboard.enabled = false

        this.add.image(this.sys.game.config.width - 48, 48, 'cross')
            .setDisplaySize(32, 32)
            .setInteractive()
            .on('pointerup', () => {
                this.close();
            });

        this.add.image(this.screenCenterX, this.screenCenterY, 'bg')
            .setDisplaySize(
                this.cameras.main.width * 0.40,
                this.cameras.main.height * 0.85
            );

        this.add.text(this.screenCenterX, this.cameras.main.height * 0.2, "Menu", {
                fontSize: "36px",
                // fontFamily: "sans-serif",
                color: "#000000",
                fontWeight: "bold"
            })
            .setOrigin(0.5, 0.5);

        this.createButtons([
            {
                text: "Save",
                onclick: function () {
                    this.oldScene.store.commit('setPlayer', {
                        x: this.oldScene.player.x,
                        y: this.oldScene.player.y,
                        mapName: this.oldScene.mapName
                    });

                    this.oldScene.showNotification("Saved");
                    this.close();
                }
            },
            {
                text: "Restart",
                onclick: function () {
                    this.oldScene.store.commit('clear');
                    window.location.reload()
                }
            },
            {
                text: "Placeholder",
                onclick: function () {
                    console.log(this)
                }
            },
            {
                text: "Placeholder",
                onclick: function () {
                    console.log(this)
                }
            }
        ])
    }

    createButtons (buttonsData, maxHeight, offsetY) {
        if (maxHeight == null)
            maxHeight = this.cameras.main.height * 0.6;
        if (offsetY == null)
            offsetY = this.cameras.main.height * 0.25;

        let sectionHeight = maxHeight / buttonsData.length;

        for (let i = 0; i < buttonsData.length; i++) {
            this.createButton({
                y: offsetY + sectionHeight * (i + 0.5),
                text: buttonsData[i].text
            }).on('pointerup', buttonsData[i].onclick.bind(this))
        }
    }

    createButton ({x, y, text, width, height, fillColor, strokeColor}) {
        if (height == null)
            height = 64
        if (x == null)
            x = this.screenCenterX
        if (width == null)
            width = this.cameras.main.width * 0.30
        if (fillColor == null)
            fillColor = 0xffffff
        if (strokeColor == null)
            strokeColor = 0x663300

        if (typeof fillColor === "string")
            fillColor = parseInt(fillColor.substring(1), 16)
        if (typeof strokeColor === "string")
            strokeColor = parseInt(strokeColor.substring(1), 16)

        let btn = this.add.rectangle(
                x, y, width, height
            ).setFillStyle(fillColor)
            .setStrokeStyle(1, strokeColor)
            .setInteractive();

        let strokeHex = "#" + strokeColor.toString(16).padStart(6, '0')

        this.add.text(x, y, text, {
            font: "28px",
            color: strokeHex
        }).setOrigin(0.5, 0.5);

        return btn;
    }

    close () {
        this.scene.stop();
        this.scene.wake('GameScene');
    }
}

export default MenuScene;
