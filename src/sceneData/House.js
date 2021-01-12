import AI from '../classes/AI.js'

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
                    sgf: "(;FF[4]GM[1]SZ[7]KM[0])",
                    background: 'water',
                    customstones: 99
                }
            },
            aiSettings: {
                level: "30k"
            },
            onWin ({ store }) {
                store.commit('levelUp');
            }
        },
        "NPC1": {
            properties: {
                spritesheet: 'Dog 01-1',
                randomWalk: true
            },
            onInteract () {
                this.baseScene.showNotification("Woof!");
            }
        }
    }
}
