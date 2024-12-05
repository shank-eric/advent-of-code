"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function knotHashRound(list, input, rounds) {
  var currentPosition = 0;
  var skipSize = 0;
  var lengths = input.map(function (l) {
    return parseInt(l);
  });

  for (var i = 0; i < rounds; i++) {
    lengths.forEach(function (length) {
      // length = parseInt(length);
      if (currentPosition + length >= list.length) {
        var wrapPosition = currentPosition + length - list.length - 1;
        var reverseStartHalf = list.slice(0, wrapPosition + 1);
        var reverseEndHalf = list.slice(currentPosition, list.length);
        var middle = list.slice(wrapPosition + 1, currentPosition);
        var reverseArray = reverseEndHalf.concat(reverseStartHalf);
        reverseArray.reverse();
        var secondHalf = reverseArray.slice(0, reverseEndHalf.length);
        var firstHalf = reverseArray.slice(reverseEndHalf.length, reverseArray.length);
        list = firstHalf.concat(middle).concat(secondHalf);
      } else {
        var _reverseArray = list.slice(currentPosition, currentPosition + length);

        _reverseArray.reverse();

        var _firstHalf = list.slice(0, currentPosition);

        var _secondHalf = list.slice(currentPosition + length, list.length);

        list = _firstHalf.concat(_reverseArray).concat(_secondHalf);
      }

      currentPosition = (currentPosition + length + skipSize) % list.length;
      skipSize++;
    });
  }

  return list;
}

var solution_1 = function solution_1(input) {
  var listLength = input.length === 7 ? 5 : 256;
  var list = Array.from(Array(listLength), function (x, i) {
    return i;
  });
  input = input.split(',');
  list = knotHashRound(list, input, 1);
  return list[0] * list[1];
};

var solution = function solution(input) {
  var list = Array.from(Array(256), function (x, i) {
    return i;
  });
  var lengths = [];

  for (var i = 0; i < input.length; i++) {
    lengths.push(input.charCodeAt(i));
  }

  lengths.push(17, 31, 73, 47, 23); // console.log(lengths);

  list = knotHashRound(list, lengths, 64);

  if (list.length !== 256) {
    throw new Error('wrong length :(');
  }

  var hash = ''; // a2 58 2a 3a  e66e6e86e3812dcb672a272
  // a2 58 2a 3a 0e66e6e86e3812dcb672a272
  //post-process list

  for (var _i = 0; _i < 16; _i++) {
    var start = _i * 16;
    var end = start + 16;
    var vals = list.slice(start, end);
    var evalString = vals.join(' ^ ');
    var intVal = eval(evalString);
    var hexVal = intVal.toString(16).padStart(2, '0');
    hash += hexVal; // console.log(`${hexVal} = ${intVal} = ${evalString}`);
  }

  return hash;
};

var _default = solution;
exports.default = _default;