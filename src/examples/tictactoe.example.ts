import ttt from '../index';

const game = new ttt(3, 'O');

while (game.ongoing) {
    game.randomTurn();
}

console.log(game.winner ? `${game.winner} won!` : 'Draw!');
console.log(game.ascii);

process.exit();
