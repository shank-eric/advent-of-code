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

function matchesChar(value, index) {
  return value === index; //String.fromCharCode(index + 65) || value === String.fromCharCode(index + 97)
}

function buildGrid(arrayInput) {
  var grid = [];
  var largestX = 0;
  var largestY = 0;
  arrayInput.forEach(function (coords, index) {
    var _coords$split = coords.split(', '),
        _coords$split2 = _slicedToArray(_coords$split, 2),
        x = _coords$split2[0],
        y = _coords$split2[1];

    x = parseInt(x);
    y = parseInt(y);

    if (!grid[y]) {
      grid[y] = [];
    }

    grid[y][x] = index;

    if (x > largestX) {
      largestX = x;
    }

    if (y > largestY) {
      largestY = y;
    }
  });

  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      if (!grid[i]) {
        grid[i] = [];
      }

      if (!grid[i][j]) {
        var closestIndex, closestDistance, overlap;
        var distances = arrayInput.forEach(function (coords, index) {
          // console.log(coords);
          var _coords$split3 = coords.split(', '),
              _coords$split4 = _slicedToArray(_coords$split3, 2),
              x = _coords$split4[0],
              y = _coords$split4[1];

          x = parseInt(x);
          y = parseInt(y);
          var distance = Math.abs(i - y) + Math.abs(j - x);

          if (closestIndex === undefined || distance < closestDistance) {
            // console.log(`${i}, ${j} to ${coords}: abs(${i} - ${y}) + abs(${j} - ${x}) = ${distance} < ${closestDistance}`)
            closestIndex = index;
            closestDistance = distance;
            overlap = false;
          } else if (distance === closestDistance) {
            // console.log(`${i}, ${j} to ${coords}: abs(${i} - ${y}) + abs(${j} - ${x}) = ${distance} === ${closestDistance}`)
            overlap = true;
          }
        });

        if (overlap) {
          grid[i][j] = '.';
        } else {
          grid[i][j] = closestIndex;
        }
      }
    };

    for (var j = 0; j <= largestX; j++) {
      _loop2(j);
    }
  };

  for (var i = 0; i <= largestY; i++) {
    _loop(i);
  }

  return {
    grid: grid,
    largestY: largestY,
    largestX: largestX
  };
}

var solution_1 = function solution_1(input) {
  var arrayInput = Array.from(input);

  var _buildGrid = buildGrid(arrayInput),
      grid = _buildGrid.grid,
      largestY = _buildGrid.largestY,
      largestX = _buildGrid.largestX;

  console.table(grid);
  var largestSize = 0;
  arrayInput.forEach(function (coords, index) {
    var onEdge = false;

    for (var i = 0; i <= largestY; i++) {
      // console.log(grid[i][0]);
      if (matchesChar(grid[i][0], index)) {
        onEdge = true;
        break;
      } else if (matchesChar(grid[i][largestX], index)) {
        onEdge = true;
        break;
      }
    }

    if (!onEdge) {
      for (var _i2 = 0; _i2 <= largestX; _i2++) {
        if (matchesChar(grid[0][_i2], index)) {
          onEdge = true;
          break;
        } else if (matchesChar(grid[largestY][_i2], index)) {
          onEdge = true;
          break;
        }
      }
    }

    if (!onEdge) {
      console.log("".concat(index, " is not on the edge"));
      var size = 0;

      for (var _i3 = 0; _i3 <= largestY; _i3++) {
        for (var j = 0; j <= largestX; j++) {
          if (matchesChar(grid[_i3][j], index)) {
            size++;
          }
        }
      }

      if (size > largestSize) {
        console.log("".concat(index, " is new largest"));
        largestSize = size;
      }
    }
  });
  return largestSize;
};

var solution = function solution(input) {
  var arrayInput = Array.from(input);

  var _buildGrid2 = buildGrid(arrayInput),
      grid = _buildGrid2.grid,
      largestY = _buildGrid2.largestY,
      largestX = _buildGrid2.largestX; // console.table(grid);


  var region = [];

  var _loop3 = function _loop3(i) {
    var _loop4 = function _loop4(j) {
      var distance = arrayInput.reduce(function (agg, coords) {
        var _coords$split5 = coords.split(', '),
            _coords$split6 = _slicedToArray(_coords$split5, 2),
            x = _coords$split6[0],
            y = _coords$split6[1];

        x = parseInt(x);
        y = parseInt(y);
        return agg + Math.abs(i - y) + Math.abs(j - x);
      }, 0);

      if (arrayInput.length < 10) {
        if (distance < 32) {
          region.push("".concat(j, ", ").concat(i));
        }
      } else if (distance < 10000) {
        region.push("".concat(j, ", ").concat(i));
      }
    };

    for (var j = 0; j <= largestX; j++) {
      _loop4(j);
    }
  };

  for (var i = 0; i <= largestY; i++) {
    _loop3(i);
  } //   let onEdge = false;
  // for (let i = 0; i <= largestY; i++){
  //   // console.log(grid[i][0]);
  //   if (matchesChar(grid[i][0], index)){
  //     onEdge = true;
  //     break;
  //   } else if (matchesChar(grid[i][largestX], index)){
  //     onEdge = true;
  //     break;
  //   }
  // }
  // if (!onEdge){
  //   for (let i = 0; i <= largestX; i++){
  //     if (matchesChar(grid[0][i], index)){
  //       onEdge = true;
  //       break;
  //     } else if (matchesChar(grid[largestY][i], index)){
  //       onEdge = true;
  //       break;
  //     }
  //   }
  // }
  // if(!onEdge) {
  //   console.log(`${index} is not on the edge`);
  //   let size = 0;
  //   for (let i = 0; i <= largestY; i++) {
  //     for (let j = 0; j <= largestX; j++) {
  //       if (matchesChar(grid[i][j], index)){
  //         size++;
  //       }
  //     }
  //   }
  //   if(size > largestSize){
  //     console.log(`${index} is new largest`)
  //     largestSize = size;
  //   }
  // }
  // });


  return region.length;
};

var _default = solution;
exports.default = _default;