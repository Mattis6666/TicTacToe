import ttt from '../index';

const game = new ttt(3, 'O');

for (let i = 0; i < 9; i++) {
    game.randomTurn();
    console.log(game.ascii);
    console.log('\n');
}
