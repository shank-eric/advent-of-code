"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var solution_1 = function solution_1(input) {
  var sum = 0;
  var arrayInput = Array.from(input);
  arrayInput.forEach(function (val, index) {
    var nextVal = index + 1 === arrayInput.length ? arrayInput[0] : arrayInput[index + 1];

    if (val === nextVal) {
      sum += parseInt(val);
    }
  });
  return sum;
};

var solution = function solution(input) {
  var sum = 0;
  var arrayInput = Array.from(input);
  arrayInput.forEach(function (val, index) {
    var nextPosition = index + arrayInput.length / 2;

    if (nextPosition <= arrayInput.length) {
      var nextVal = arrayInput[nextPosition];

      if (val === nextVal) {
        sum += parseInt(val) * 2;
      }
    }
  });
  return sum;
};

var _default = solution;
exports.default = _default;