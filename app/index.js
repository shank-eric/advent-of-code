import { Command, Option } from 'commander';
import colors from 'colors';
import util from 'util';

const program = new Command();
program.option('-d, --day <number>', 'which day are you testing');
program.option('-p, --part <number>', 'which part are you testing');
program.parse(process.argv);
const { day, part } = program.opts();
// const day = process.argv[2];

import(`./day-${day}/part-${part}/index.js`).then(
  ({ solution, tests, loadData }) => {
    let testsPass = tests.every((test) => {
      const { expectedResult, input, name, ...rest } = test;
      let result = solution(input, rest);
      if (result === expectedResult) {
        console.log(
          colors.green(
            `SUCCESS!! ${result} === ${expectedResult} for ${name || input}\r\n`
          )
        );
        return true;
      } else {
        console.log(colors.red('FAIL :('));
        console.log(
          colors.red(
            `input: ${
              name || input
            } resulted in ${result} instead of ${expectedResult}\r\n`
          )
        );
        return false;
      }
    });

    if (testsPass) {
      console.log('ALL TESTS PASSED! RUNNING REAL INPUT!');
      // const { data, ...rest } = loadData(day);
      const data = loadData(day);
      const result = solution(data);
      console.log(colors.green(result));
    }
  }
);
