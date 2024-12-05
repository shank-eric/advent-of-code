"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var solution_1 = function solution_1(input) {
  input = input.map(function (i) {
    return parseInt(i);
  });
  console.log(input, input.length);
  var foundScenarios = {};
  var loops = 0;
  var currScenario = '';

  var _loop = function _loop() {
    var largestBlock = Math.max.apply(null, input);
    var largestIndex = input.findIndex(function (i) {
      return i === largestBlock;
    });
    input[largestIndex] = 0; // console.log(`largestBlock is ${largestBlock} at index ${largestIndex}`);

    for (var i = 1; i <= largestBlock; i++) {
      var index = largestIndex + i;

      if (index >= input.length) {
        index = index % input.length;
      } // console.log(`updating index ${index}`);


      input[index]++;
    }

    currScenario = input.join(',');
    loops++;

    if (foundScenarios[currScenario]) {
      console.log("found ".concat(currScenario));
      return "break";
    } else {
      console.log("adding ".concat(currScenario));
      foundScenarios[currScenario] = true; // console.log(`scenarios: ${util.inspect(foundScenarios)}`);

      currScenario = '';
    }
  };

  while (true) {
    var _ret = _loop();

    if (_ret === "break") break;
  }

  return loops;
};

var solution = function solution(input) {
  input = input.map(function (i) {
    return parseInt(i);
  });
  console.log(input, input.length);
  var foundScenarios = {};
  var loops = 0;
  var currScenario = '';

  var _loop2 = function _loop2() {
    var largestBlock = Math.max.apply(null, input);
    var largestIndex = input.findIndex(function (i) {
      return i === largestBlock;
    });
    input[largestIndex] = 0; // console.log(`largestBlock is ${largestBlock} at index ${largestIndex}`);

    for (var i = 1; i <= largestBlock; i++) {
      var index = largestIndex + i;

      if (index >= input.length) {
        index = index % input.length;
      } // console.log(`updating index ${index}`);


      input[index]++;
    }

    currScenario = input.join(',');
    loops++;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("loops: ".concat(loops)); // if (loops > 10){
    //   break;
    // }

    Object.keys(foundScenarios).forEach(function (key) {
      return foundScenarios[key]++;
    }); // console.log(`currScenario: ${currScenario}`);
    // console.log(`scenarios: ${util.inspect(foundScenarios)}`);

    if (foundScenarios[currScenario] !== undefined) {
      // console.log(`found ${currScenario}`);
      if (foundScenarios[currScenario] > 0) {
        loops = foundScenarios[currScenario];
        return "break";
      } else {
        foundScenarios[currScenario]++;
      }
    } else {
      // console.log(`adding ${currScenario}`);
      foundScenarios[currScenario] = 0;
      currScenario = '';
    }
  };

  while (true) {
    var _ret2 = _loop2();

    if (_ret2 === "break") break;
  }

  return loops;
};

var _default = solution;
exports.default = _default;