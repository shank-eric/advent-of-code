"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _console = _interopRequireDefault(require("console.table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function setupFabric(input) {
  var fabric = [];
  arrayInput.forEach(function (string) {
    // '#1 @ 1,3: 4x4',
    console.log(string);

    var _string$split = string.split(' @ '),
        _string$split2 = _slicedToArray(_string$split, 2),
        id = _string$split2[0],
        rest = _string$split2[1];

    var _rest$split = rest.split(': '),
        _rest$split2 = _slicedToArray(_rest$split, 2),
        coords = _rest$split2[0],
        size = _rest$split2[1];

    var _coords$split = coords.split(','),
        _coords$split2 = _slicedToArray(_coords$split, 2),
        x = _coords$split2[0],
        y = _coords$split2[1];

    var _size$split = size.split('x'),
        _size$split2 = _slicedToArray(_size$split, 2),
        width = _size$split2[0],
        height = _size$split2[1];

    x = parseInt(x);
    y = parseInt(y);
    width = parseInt(width);
    height = parseInt(height);

    for (var i = x; i < x + width; i++) {
      for (var j = y; j < y + height; j++) {
        fabric[i] = fabric[i] || [];

        if (fabric[i][j]) {
          fabric[i][j] = 'X';
        } else {
          fabric[i][j] = id;
        }
      }
    }
  }); // console.table(fabric);

  return fabric;
}

var solution_1 = function solution_1(input) {
  var arrayInput = Array.from(input);
  var fabric = setupFabric(arrayInput);
  var overlap = 0;
  fabric.forEach(function (row) {
    return row.forEach(function (cell) {
      return cell === 'X' && overlap++;
    });
  });
  return overlap;
};

var solution = function solution(input) {
  var arrayInput = Array.from(input);
  var fabric = [];
  var ideas = arrayInput.map(function (string) {
    // '#1 @ 1,3: 4x4',
    var _string$split3 = string.split(' @ '),
        _string$split4 = _slicedToArray(_string$split3, 2),
        id = _string$split4[0],
        rest = _string$split4[1];

    var _rest$split3 = rest.split(': '),
        _rest$split4 = _slicedToArray(_rest$split3, 2),
        coords = _rest$split4[0],
        size = _rest$split4[1];

    var _coords$split3 = coords.split(','),
        _coords$split4 = _slicedToArray(_coords$split3, 2),
        x = _coords$split4[0],
        y = _coords$split4[1];

    var _size$split3 = size.split('x'),
        _size$split4 = _slicedToArray(_size$split3, 2),
        width = _size$split4[0],
        height = _size$split4[1];

    var idea = {
      id: id,
      x: parseInt(x),
      y: parseInt(y),
      width: parseInt(width),
      height: parseInt(height)
    };

    for (var i = idea.x; i < idea.x + idea.width; i++) {
      for (var j = idea.y; j < idea.y + idea.height; j++) {
        fabric[i] = fabric[i] || [];

        if (fabric[i][j]) {
          fabric[i][j] = 'X';
        } else {
          fabric[i][j] = idea.id;
        }
      }
    }

    idea.size = width * height;
    return idea;
  });
  var found;
  ideas.forEach(function (idea) {
    idea.count = 0;
    fabric.forEach(function (row) {
      return row.forEach(function (cell) {
        return cell === idea.id && idea.count++;
      });
    });

    if (idea.count === idea.size) {
      found = idea;
    }
  }); // console.log(ideas);
  // console.table(fabric);

  return found.id;
};

var _default = solution;
exports.default = _default;