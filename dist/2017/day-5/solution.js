"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var solution_1 = function solution_1(input) {
  var currentIndex = 0;
  var steps = 0;

  while (currentIndex < input.length) {
    steps++;
    var currentVal = parseInt(input[currentIndex]);
    input[currentIndex]++;
    currentIndex += currentVal;
  }

  return steps;
};

var solution = function solution(input) {
  var currentIndex = 0;
  var steps = 0;

  while (currentIndex < input.length) {
    steps++;
    var currentVal = parseInt(input[currentIndex]);

    if (currentVal >= 3) {
      input[currentIndex]--;
    } else {
      input[currentIndex]++;
    }

    currentIndex += currentVal;
  }

  return steps;
};

var _default = solution;
exports.default = _default;