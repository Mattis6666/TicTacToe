import TicTacToe from '../index';
const ttt = new TicTacToe(5, 'O');

test('Constructor', () => {
    expect(ttt.gridSize).toBe(5);
    expect(ttt.currentTurn).toBe('O');
});

test('Board', () => {
    expect(ttt.possibleTurns.length).toBe(ttt.gridSize ** 2);
});

test('Checks', () => {
    const tG = new TicTacToe();
    tG.turn(1, 1);
    tG.turn(2, 3);
    tG.turn(1, 2);
    tG.turn(2, 1);
    tG.turn(2, 2);
    tG.turn(3, 3);
    tG.turn(3, 1);
    tG.turn(3, 2);
    expect(tG.status).toBe('ongoing');
    tG.turn(1, 3);
    expect(tG.horizontals).toEqual([
        ['X', 'X', 'X'],
        ['O', 'X', 'O'],
        ['X', 'O', 'O']
    ]);
    expect(tG.verticals).toEqual([
        ['X', 'O', 'X'],
        ['X', 'X', 'O'],
        ['X', 'O', 'O']
    ]);
    expect(tG.diagonals).toEqual([
        ['X', 'X', 'O'],
        ['X', 'X', 'X']
    ]);
    expect(tG.winner).toBe('X');
    expect(tG.status).toBe('X');
});

test('Invalid turns', () => {
    const tG = new TicTacToe();
    tG.turn(1, 1);
    expect(tG.turn(1, 1)).toBeFalsy();
    tG.turn(2, 1);
    tG.turn(1, 2);
    tG.turn(2, 2);
    tG.turn(1, 3);
    expect(tG.randomTurn()).toBeFalsy();
    expect(tG.turn(3, 3)).toBeFalsy();
});
