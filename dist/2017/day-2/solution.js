"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var solution_1 = function solution_1(input) {
  var sum = 0;
  input.forEach(function (row) {
    var max = parseInt(row[0]);
    var min = max;
    row.forEach(function (cell) {
      var val = parseInt(cell);

      if (val > max) {
        max = val;
      }

      if (val < min) {
        min = val;
      }
    }); // console.log(max, min, max - min);

    sum += max - min;
  });
  return sum;
};

var solution = function solution(input) {
  var sum = 0;
  input.forEach(function (row) {
    row.forEach(function (cell, index) {
      var val = parseInt(cell);

      for (var i = index + 1; i < row.length; i++) {
        var otherVal = parseInt(row[i]);

        if (val % otherVal === 0) {
          sum += val / otherVal;
        } else if (otherVal % val === 0) {
          sum += otherVal / val;
        }
      }
    });
  });
  return sum;
};

var _default = solution;
exports.default = _default;