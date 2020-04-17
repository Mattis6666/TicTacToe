export default class TicTacToe {
    private _gridSize: number;
    private _board: (null | Players)[][];
    private _turn: Players;
    constructor(gridSize = 3, startingPlayer: Players = 'X') {
        this._gridSize = gridSize;
        this._board = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
        this._turn = startingPlayer;
    }
    private nextTurn() {
        this._turn = this._turn === 'O' ? 'X' : 'O';
    }

    randomTurn() {
        const [x, y] = this.possibleTurns[Math.floor(Math.random() * this.possibleTurns.length)];
        this._board[x - 1][y - 1] = this._turn;
        this.nextTurn();
        return [x, y];
    }

    turn(x: number, y: number) {
        if (!this.possibleTurns.some(ele => ele[0] === x && ele[1] === y))
            throw new Error(`Field (${x}|${y}) is not on the board or already taken!`);
        this._board[x - 1][y - 1] = this._turn;
        this.nextTurn();
        return [x, y];
    }

    get possibleTurns() {
        const turns = [];
        for (let i = 0; i < this._board.length; i++) {
            for (let j = 0; j < this._board[i].length; j++) {
                if (!this._board[i][j]) turns.push([i + 1, j + 1]);
            }
        }
        return turns;
    }

    get gridSize() {
        return this._gridSize;
    }

    get board() {
        return this._board;
    }

    get ascii() {
        return (
            ' ' +
            this._board
                .map(row => row.map(field => field || ' ').join(' | '))
                .join(`\n${'-'.repeat(this._gridSize * 4 - 1)}\n `)
        );
    }
    get currentTurn() {
        return this._turn;
    }
}

export type Players = 'X' | 'O';
