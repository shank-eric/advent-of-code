const solution_1 = function(input){
  let squareRoot = 1;
  let stepsOut = 0;
  while(input > squareRoot * squareRoot){
    squareRoot += 2;
    stepsOut++;
  }
  // let square = squareRoot * squareRoot;
  let prevSquare = (squareRoot - 2) * (squareRoot - 2);
  let squareSideSize = squareRoot - 1;
  let midSide = squareSideSize / 2;
  let currSideMid = prevSquare + midSide;
  let stepsSide = input - currSideMid;
  for (let i = 2; i <= 4; i++){
    currSideMid = currSideMid + squareSideSize;
    let newStepsSide = Math.abs(input - currSideMid);
    if (newStepsSide < stepsSide){
      stepsSide = newStepsSide;
    }
  }

  return stepsSide + stepsOut;
}


const solution = function(input){
  let map = [ [ 1 ] ];
  let currRow = 0;
  let currCol = 1;
  let currBox = 1;
  let direction = 'up';
  let result = 0;

  function generateNextVal(){
    let log = `(${currRow},${currCol}) -> `;
    let vals = [];
    let nextVal = 0;
    for(let row = -1; row <= 1; row++){
      for (let col = -1; col <= 1; col++){
        if (col === 0 && row === 0){
          continue;
        }
        if (map[currRow + row] && map[currRow + row][currCol + col]){
          vals.push(map[currRow + row][currCol + col]);
          nextVal += map[currRow + row][currCol + col];
        }
      }
    }
    // console.log(`${log}${vals.join(' + ')} = ${nextVal}`);

    if (!map[currRow]){
      map[currRow] = [];
    }
    map[currRow][currCol] = nextVal;

    //set nextPos
    // if (currRow === 0 && currCol === 0){
    //   currCol = 1;
    // } else
    if (currRow === -currBox && currCol === currBox){
      currBox++;
      currCol++;
    } else {
      if (direction === 'right'){
        currCol++;
        if (currCol === currBox){
          direction = 'up'
        }
      } else if (direction === 'up'){
        currRow++;
        if(currRow === currBox){
          direction = 'left';
        }
      } else if (direction === 'left'){
        currCol--;
        if (currCol === -currBox){
          direction = 'down';
        }
      } else if (direction === 'down'){
        currRow--;
        if (currRow === -currBox){
          direction = 'right';
        }
      }
    }

    // console.log(`adding ${nextVal}`);
    return nextVal;
  }

  while (result < input){
    result = generateNextVal();
  }

  // result = generateNextVal();
  for (let row = currBox; row >= -currBox; row--){
    let line = '';
    for (let col = -currBox; col <= currBox; col++){
      if (map[row] && map[row][col]) {
        line += map[row][col].toString().padStart(10);
      } else {
        line += ' _________';
      }
    }
    console.log(line);
  }
  return result;
}

export default solution;