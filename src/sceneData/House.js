export default {
    config: {
    },
    actionAreas: {
        "BlockPath": {
            properties: {
                text: "The path is blocked"
            }
        },
        "OpenBoard1": {
            properties: {
                type: "Game",
                title: "Fight!",
                boardSettings: {
                    sgf: "(;FF[4]GM[1]SZ[19])",
                    background: 'water',
                    customstones: 99
                }
            }
        }
    },
    interactors: {
        "NPC1": {
            properties: {
                spritesheet: 'Dog 01-1',
                randomWalk: true
            },
            onInteract (npc) {
                this.showNotification("Woof!");
            }
        }
    }
}
