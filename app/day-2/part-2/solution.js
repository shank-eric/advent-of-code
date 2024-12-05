import { logJson } from '../../helpers/index.js';
const solution = function (input) {
  const games = input.map((row) => {
    const [game, info] = row.split(':');
    const cubeCounts = info.split(';');

    return {
      row,
      number: parseInt(game.replace('Game ', '')),
      red: 1,
      green: 1,
      blue: 1,
      tries: cubeCounts.map((count) => {
        const cubes = count.split(', ');
        return cubes.map((cube) => {
          const [count, color] = cube.trim().split(' ');
          return { count: parseInt(count), color };
        });
      }),
    };
  });

  let gamePowerSum = 0;
  for (const game of games) {
    game.tries.forEach((trie) => {
      trie.forEach((cube) => {
        if (cube.count > game[cube.color]) {
          game[cube.color] = cube.count;
        }
      });
    });
    game.power = game.red * game.blue * game.green;
    gamePowerSum += game.power;
    // console.log(gamePossible);
    // logJson(game);
  }
  return gamePowerSum;
};

export default solution;
