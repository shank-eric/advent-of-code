"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var solution_1 = function solution_1(input) {
  var sum = 0;
  var arrayInput = Array.from(input);
  arrayInput.forEach(function (val, index) {
    sum += parseInt(val.replace('+', ''));
  });
  return sum;
};

var solution = function solution(input) {
  var sum = 0;
  var arrayInput = Array.from(input);
  var position = 0;
  var found = false;
  var duplicateVal;
  var seenValues = {
    0: true
  };

  while (!found) {
    var val = parseInt(arrayInput[position].replace('+', '')); // console.log(`adding ${val} to ${sum}`);

    sum += val;

    if (seenValues[sum]) {
      found = true;
      duplicateVal = sum;
    } else {
      seenValues[sum] = true;
      position++;

      if (position >= arrayInput.length) {
        position = 0;
      } // console.log(`haven't seen ${sum}`);

    }
  }

  return duplicateVal;
};

var _default = solution;
exports.default = _default;