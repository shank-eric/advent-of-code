"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var solution_1 = function solution_1(input) {
  var squareRoot = 1;
  var stepsOut = 0;

  while (input > squareRoot * squareRoot) {
    squareRoot += 2;
    stepsOut++;
  } // let square = squareRoot * squareRoot;


  var prevSquare = (squareRoot - 2) * (squareRoot - 2);
  var squareSideSize = squareRoot - 1;
  var midSide = squareSideSize / 2;
  var currSideMid = prevSquare + midSide;
  var stepsSide = input - currSideMid;

  for (var i = 2; i <= 4; i++) {
    currSideMid = currSideMid + squareSideSize;
    var newStepsSide = Math.abs(input - currSideMid);

    if (newStepsSide < stepsSide) {
      stepsSide = newStepsSide;
    }
  }

  return stepsSide + stepsOut;
};

var solution = function solution(input) {
  var map = [[1]];
  var currRow = 0;
  var currCol = 1;
  var currBox = 1;
  var direction = 'up';
  var result = 0;

  function generateNextVal() {
    var log = "(".concat(currRow, ",").concat(currCol, ") -> ");
    var vals = [];
    var nextVal = 0;

    for (var row = -1; row <= 1; row++) {
      for (var col = -1; col <= 1; col++) {
        if (col === 0 && row === 0) {
          continue;
        }

        if (map[currRow + row] && map[currRow + row][currCol + col]) {
          vals.push(map[currRow + row][currCol + col]);
          nextVal += map[currRow + row][currCol + col];
        }
      }
    } // console.log(`${log}${vals.join(' + ')} = ${nextVal}`);


    if (!map[currRow]) {
      map[currRow] = [];
    }

    map[currRow][currCol] = nextVal; //set nextPos
    // if (currRow === 0 && currCol === 0){
    //   currCol = 1;
    // } else

    if (currRow === -currBox && currCol === currBox) {
      currBox++;
      currCol++;
    } else {
      if (direction === 'right') {
        currCol++;

        if (currCol === currBox) {
          direction = 'up';
        }
      } else if (direction === 'up') {
        currRow++;

        if (currRow === currBox) {
          direction = 'left';
        }
      } else if (direction === 'left') {
        currCol--;

        if (currCol === -currBox) {
          direction = 'down';
        }
      } else if (direction === 'down') {
        currRow--;

        if (currRow === -currBox) {
          direction = 'right';
        }
      }
    } // console.log(`adding ${nextVal}`);


    return nextVal;
  }

  while (result < input) {
    result = generateNextVal();
  } // result = generateNextVal();


  for (var row = currBox; row >= -currBox; row--) {
    var line = '';

    for (var col = -currBox; col <= currBox; col++) {
      if (map[row] && map[row][col]) {
        line += map[row][col].toString().padStart(10);
      } else {
        line += ' _________';
      }
    }

    console.log(line);
  }

  return result;
};

var _default = solution;
exports.default = _default;