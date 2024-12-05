import { logJson } from '../../helpers/index.js';
const solution = function (input, { maxCubes }) {
  console.log(maxCubes);
  const games = input.map((row) => {
    const [game, info] = row.split(':');
    const cubeCounts = info.split(';');

    return {
      row,
      number: parseInt(game.replace('Game ', '')),
      tries: cubeCounts.map((count) => {
        const cubes = count.split(', ');
        return cubes.map((cube) => {
          const [count, color] = cube.trim().split(' ');
          // console.log({ count, color }, cube);
          return { count, color };
        });
      }),
    };
  });
  // logJson(games);
  let failedGamesSum = 0;
  for (const game of games) {
    const gamePossible = game.tries.every((trie) => {
      // console.log(trie);
      return trie.every((cube) => {
        // console.log(`${cube.count} < ${maxCubes[cube.color]}`);
        return cube.count <= maxCubes[cube.color];
      });
    });
    if (gamePossible) {
      failedGamesSum += game.number;
    }
    // console.log(gamePossible);
    // logJson(game);
    //     const anyFailures = game.tries.every((try) =>
    //       try.cubes.every(cube => cube.count < maxCubes[cube.color])
    // )
  }
  return failedGamesSum;
};

export default solution;
