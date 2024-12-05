"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _console = _interopRequireDefault(require("console.table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var solution_1 = function solution_1(input) {
  var curr = input;

  while (true) {
    var reduced = ''; // console.log(reduced, curr);

    for (var i = 0; i < curr.length; i++) {
      // console.log(i);
      var currCode = curr.charCodeAt(i);
      var nextCode = curr.charCodeAt(i + 1);
      var nextIsUpper = currCode - 32 === nextCode;
      var nextIsLower = currCode + 32 === nextCode;

      if (!(nextIsUpper || nextIsLower)) {
        reduced += curr.charAt(i);
      } else {
        i += 1;
      }
    }

    if (reduced === curr) {
      break;
    } else {
      curr = reduced;
    } // console.log(reduced, curr, reduced === curr);

  }

  return curr.length;
};

function reactPolymer(curr) {
  while (true) {
    var reduced = ''; // console.log(reduced, curr);

    for (var i = 0; i < curr.length; i++) {
      // console.log(i);
      var currCode = curr.charCodeAt(i);
      var nextCode = curr.charCodeAt(i + 1);
      var nextIsUpper = currCode - 32 === nextCode;
      var nextIsLower = currCode + 32 === nextCode;

      if (!(nextIsUpper || nextIsLower)) {
        reduced += curr.charAt(i);
      } else {
        i += 1;
      }
    }

    if (reduced === curr) {
      break;
    } else {
      curr = reduced;
    } // console.log(reduced, curr, reduced === curr);

  }

  return curr;
}

var solution = function solution(input) {
  var units = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var char = _step.value;

      if (char.charCodeAt(0) > 90) {
        char = String.fromCharCode(char.charCodeAt(0) - 32);
      }

      if (!units[char]) {
        units[char] = {
          upper: char,
          lower: String.fromCharCode(char.charCodeAt(0) + 32)
        };
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var shortest;
  Object.values(units).forEach(function (unit) {
    var lowerRegex = new RegExp(unit.lower, 'g');
    var upperRegex = new RegExp(unit.upper, 'g');
    unit.replacedInput = input.replace(lowerRegex, '').replace(upperRegex, ''); // console.log(unit);

    unit.polymer = reactPolymer(unit.replacedInput);

    if (!shortest) {
      shortest = unit;
    } else if (unit.polymer.length < shortest.polymer.length) {
      shortest = unit;
    }
  });
  return shortest.polymer.length;
};

var _default = solution;
exports.default = _default;