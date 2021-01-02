import axios from 'axios';

export default class AI {
    constructor (level) {
        this.level = level;
    }

    genMove (board) {
        let sgf = besogo.composeSgf(board.editor);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    x: 0,
                    y: 0
                })
            }, 4000);
        });
    }
}
