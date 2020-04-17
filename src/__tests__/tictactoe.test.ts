import TicTacToe from '../index';
const ttt = new TicTacToe(5, 'O');

test('Constructor', () => {
    expect(ttt.gridSize).toBe(5);
    expect(ttt.currentTurn).toBe('O');
});

test('Board', () => {
    expect(ttt.possibleTurns.length).toBe(ttt.gridSize ** 2);
});
