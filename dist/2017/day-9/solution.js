"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var solution_1 = function solution_1(input) {
  var groups = {};
  var currentGroup;
  var isGarbage = false;

  for (var i = 0; i < input.length; i++) {
    switch (input[i]) {
      case '!':
        i++;
        continue;
        break;

      case '<':
        isGarbage = true;
        break;

      case '>':
        isGarbage = false;
        break;

      case '{':
        if (isGarbage) {
          continue;
          break;
        } else {
          var newGroup = {
            value: '{',
            children: {},
            score: 1
          };

          if (currentGroup) {
            currentGroup.children[i] = newGroup;
            newGroup.score = currentGroup.score + 1;
            newGroup.parent = currentGroup;
          }

          currentGroup = newGroup; // console.log(`adding group ${util.inspect(currentGroup)} at index ${i}`);

          groups[i] = currentGroup;
        }

        break;

      case '}':
        if (isGarbage) {
          continue;
          break;
        } else {
          currentGroup.value += '}';

          if (currentGroup.parent) {
            currentGroup = currentGroup.parent;
          } else {
            currentGroup = {
              value: '',
              children: {}
            };
          }
        }

        break;

      default:
        currentGroup.value += input[i];
        break;
    }
  } // console.log(util.inspect(groups, { depth: 5 }));


  var sum = 0;
  Object.entries(groups).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        index = _ref2[0],
        group = _ref2[1];

    sum += group.score;
  });
  return sum;
};

var solution = function solution(input) {
  var groups = {};
  var currentGroup;
  var isGarbage = false;
  var garbageChars = 0;

  for (var i = 0; i < input.length; i++) {
    switch (input[i]) {
      case '!':
        i++;
        continue;
        break;

      case '<':
        if (isGarbage) {
          garbageChars++;
          continue;
          break;
        } else {
          isGarbage = true;
        }

        break;

      case '>':
        isGarbage = false;
        break;

      case '{':
        if (isGarbage) {
          garbageChars++;
          continue;
          break;
        } else {
          var newGroup = {
            value: '{',
            children: {},
            score: 1
          };

          if (currentGroup) {
            currentGroup.children[i] = newGroup;
            newGroup.score = currentGroup.score + 1;
            newGroup.parent = currentGroup;
          }

          currentGroup = newGroup; // console.log(`adding group ${util.inspect(currentGroup)} at index ${i}`);

          groups[i] = currentGroup;
        }

        break;

      case '}':
        if (isGarbage) {
          garbageChars++;
          continue;
          break;
        } else {
          currentGroup.value += '}';

          if (currentGroup.parent) {
            currentGroup = currentGroup.parent;
          } else {
            currentGroup = {
              value: '',
              children: {}
            };
          }
        }

        break;

      default:
        if (isGarbage) {
          garbageChars++;
          continue;
          break;
        } else {
          currentGroup.value += input[i];
        }

        break;
    }
  } // console.log(util.inspect(groups, { depth: 5 }));
  // let sum = 0;
  // Object.entries(groups).forEach(([ index, group ]) => {
  //   sum += group.score;
  // });
  // return sum;


  return garbageChars;
};

var _default = solution;
exports.default = _default;