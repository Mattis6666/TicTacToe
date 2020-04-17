export default class TicTacToe {
    constructor(gridSize = 3, startingPlayer: Players = 'X') {
        this._gridSize = gridSize;
        this._board = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
        this._turn = startingPlayer;
    }

    private _gridSize: number;
    private _board: (null | Players)[][];
    private _turn: Players;
    private nextTurn() {
        this._turn = this._turn === 'O' ? 'X' : 'O';
    }

    randomTurn() {
        if (this.status !== 'ongoing') return;
        const [x, y] = this.possibleTurns[Math.floor(Math.random() * this.possibleTurns.length)];
        this._board[x - 1][y - 1] = this._turn;
        this.nextTurn();
        return [x, y];
    }

    turn(x: number, y: number) {
        if (this.status !== 'ongoing') return;
        if (!this.possibleTurns.some(ele => ele[0] === x && ele[1] === y)) return;
        this._board[x - 1][y - 1] = this._turn;
        this.nextTurn();
        return [x, y];
    }

    get ongoing() {
        return this.status === 'ongoing';
    }

    get winner() {
        let winner: Players | null = null;
        [this.horizontals, this.verticals, this.diagonals].forEach(arr =>
            arr.forEach(line => {
                if (line.every(p => p === line[0]) && line[0]) winner = line[0] as Players;
            })
        );
        return winner;
    }

    get horizontals() {
        return this._board;
    }
    get verticals() {
        const verticals = [];
        for (let i = 0; i < this._gridSize; i++) verticals.push(this._board.map(row => row[i]));
        return verticals;
    }
    get diagonals() {
        const diagonals: (string | null)[][] = [];
        [this._board, [...this._board].reverse()].forEach(board => {
            const diagonal = [];

            for (let i = 0; i < board.length; i++) diagonal.push(board[i][i]);
            diagonals.push(diagonal);
        });
        return diagonals;
    }

    get status() {
        return this.winner || (this.possibleTurns.length ? 'ongoing' : 'draw');
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
