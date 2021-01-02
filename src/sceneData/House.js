export default {
    config: {
    },
    events: {
        "BlockPath": {
            properties: {
                text: "The path is blocked"
            }
        },
        "OpenBoard1": {
            type: "Game",
            properties: {
                title: "Fight!",
                boardSettings: {
                    sgf: "(;FF[4]GM[1]SZ[19])",
                    background: 'water',
                    customstones: 99
                }
            },
            genMove (board) {
                board.editor.playMove(0, 0, 0)
            }
        },
        "NPC1": {
            properties: {
                spritesheet: 'Dog 01-1',
                randomWalk: true
            },
            onInteract ({scene}) {
                scene.showNotification("Woof!");
            }
        }
    }
}
