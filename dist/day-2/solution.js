"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var solution_1 = function solution_1(input) {
  var arrayInput = Array.from(input);
  var counts = {};
  var twoLetters = 0;
  var threeLetters = 0;
  arrayInput.forEach(function (string, index) {
    counts[string] = {};

    _toConsumableArray(string).forEach(function (letter) {
      if (!counts[string][letter]) {
        counts[string][letter] = 1;
      } else {
        counts[string][letter]++;
      }
    });

    if (Object.values(counts[string]).some(function (val) {
      return val === 2;
    })) {
      twoLetters++;
    }

    if (Object.values(counts[string]).some(function (val) {
      return val === 3;
    })) {
      threeLetters++;
    }

    console.log(twoLetters, threeLetters);
  });
  return twoLetters * threeLetters;
};

var solution = function solution(input) {
  var options = {};
  var found;
  var arrayInput = Array.from(input);
  arrayInput.forEach(function (string, index) {
    for (var i = 0; i < string.length; i++) {
      var sliced = string.slice(0, i) + string.slice(i + 1, string.length); // console.log(sliced)

      if (options[sliced] && options[sliced] !== string) {
        found = sliced; // console.log(options);

        break;
      } else {
        options[sliced] = string;
      }
    }
  });
  return found;
};

var _default = solution; //wrong answers:
// yuxwcbzrmdvpsjgklthnlioqe
// yuxwcbzrmdvpsjgklthnlioqe

exports.default = _default;