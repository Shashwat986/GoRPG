import axios from 'axios';

export default class AI {
    constructor ({ level }) {
        this.level = level;
    }

    baseUrl () {
        return __BASEURL__ + `/rank/${this.level}/`;
    }

    getColor (board) {
        if (board.editor.getCurrent().move.color < 0) {
            return 'W'
        } else {
            return 'B'
        }
    }

    convertToXY (move, board) {
        if (move == "PASS") {
            return {
                x: 0,
                y: 0
            }
        }
        let x = "ABCDEFGHJKLMNOPQRSTUVWXYZ".indexOf(move[0]) + 1
        let y = board.editor.getCurrent().getSize().y - parseInt(move[1]) + 1
        return {
            x: x,
            y: y
        }
    }

    genMove (board) {
        let sgf = besogo.composeSgf(board.editor);

        let color = this.getColor(board);

        return axios.post(this.baseUrl() + 'genmove/' + color, {
            sgf: sgf
        }).then((resp) => {
            let move = resp.data.response;
            console.log(move);

            let d = this.convertToXY(move, board)
            console.log(d)
            return d;
        });
    }
}
