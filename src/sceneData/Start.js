export default {
    config: {
    },
    events: {
        "OpenBoard2": {
            type: "Game",
            properties: {
                title: "Fight!",
                boardSettings: {
                    sgf: "(;FF[4]GM[1]SZ[9])",
                    editor: "playWithoutUndo"
                }
            },
            genMove (board) {
                console.log(board);
            }
        },
        "OpenBoard3": {
            type: "Tutorial",
            afterAction () {
                this.store.commit('newState', 'TutorialDone');
            },
            properties: {
                title: "Learn the Rules",
                instructions: [
                    {
                        sgf: "(;FF[4]GM[1]SZ[19])",
                        editor: "auto",
                        text: "In Go, two people take turns to place Black and White stones on the 361 intersections of a 19x19 board.<br/><br/>You can try out playing a few moves on the full board here"
                    },
                    {
                        sgf: "(;FF[4]GM[1]SZ[5]AB[cc]TR[bc][dc][cb][cd])",
                        editor: "navOnly",
                        text: `Let's start with a smaller board for now. We're going to be learning the rules through a 5x5 board.
                               <br/>
                               <br/>
                               The empty spots next to a stone, connected by a line are called its liberties (marked with triangles)`
                    },
                    {
                        sgf: "(;FF[4]GM[1]SZ[5]AB[cc]TR[bc][dc][cb][cd])",
                        editor: "navOnly",
                        text: `Depending on their place on the board, stones may have a different number of liberties.
                               <br/>
                               <br/>
                               Stones in the middle of the board have 4 liberties. Stones on the edge have 3 liberties, and stones in the corner have 2 liberties.`
                    },
                    {
                        sgf: "(;FF[4]GM[1]SZ[5]AB[cc]TR[bc][dc][cb][cd])",
                        editor: "navOnly",
                        text: `If an opponent's stone is placed on one of the empty points, the number of liberties reduces.
                               <br/>
                               <br/>
                               If your own stone is connected to another stone, they share their liberties, increasing the number of liberties of the "group" of stones.
                               <br/>
                               <br/>
                               See if you can figure out the number of liberties of the black group shown here.`
                    },
                    {
                        sgf: "(;FF[4]GM[1]SZ[5]AB[bc][cb][cd]AW[cc];B[dc])",
                        editor: "navOnly",
                        text: "The empty spots next to a stone, connected by a line are called its liberties"
                    },
                    {
                        sgf: "(;FF[4]GM[1]SZ[5]AB[bc][cb][cd]AW[cc];B[dc])",
                        text: "If white plays at the extra liberty point, white will be able to escape. This is because connected stones share liberties"
                    }
                ]
            }
        }
    }
}
