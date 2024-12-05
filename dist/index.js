"use strict";

var _colors = _interopRequireDefault(require("colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

console.log('trying to import....'); // import { solution, tests, loadData, day } from './day-8';
// console.log(solution);
// const p = new Promise((resolve, reject) => {
//   console.log('in a promise');
//   resolve('something');
// });
//
// p.then(s => console.log(s));

Promise.resolve().then(function () {
  return _interopRequireWildcard(require('./day-8/index.js'));
}).then(function (day) {
  console.log(day);
  /* CODE HERE*/
}).catch(function (e) {
  return console.log(e);
}); // import('./day-8').then(([  ]) => {
//
//   let testsPass = tests.every((test) => {
//     let result = solution(test.input);
//     if (result === test.expectedResult) {
//       console.log(colors.green(`SUCCESS!! ${result} === ${test.expectedResult} for ${test.input}`));
//       return true;
//     } else {
//       console.log(colors.red("FAIL :("));
//       console.log(colors.red(`input: ${test.input} resulted in ${result} instead of ${test.expectedResult}`));
//       return false;
//     }
//   });
//
//   if (testsPass) {
//     console.log("ALL TESTS PASSED! RUNNING REAL INPUT!");
//     let input = loadData(day);
//     let result = solution(input);
//     console.log(colors.green(result));
//   }
// });