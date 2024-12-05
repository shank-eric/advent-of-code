import cTable from 'console.table';
import util from 'util';
import { overwrite } from '../helpers'


const calculatePowerLevel = (x, y, serial) => {
  x = parseInt(x);
  y = parseInt(y);
  const rackId = x + 10;
  let powerLevel = rackId * y;
  powerLevel += serial;
  powerLevel = powerLevel * rackId;
  let hundreds;
  if (powerLevel < 100){
    hundreds = 0;
  } else {
    hundreds = (powerLevel + '').split('').reverse()[2];
    hundreds = parseInt(hundreds)
  }
  return hundreds - 5;
}

const calculateGrid = (serial) => {
  return new Array(300).fill(0).map((row, y) => new Array(300).fill(0).map((cell, x) => {
    const obj = {}
    obj.power = calculatePowerLevel(x, y, serial);
    // if (45 <= y && y <= 47 && 33 <= x && x <= 35){
    //   console.log(y, x, obj);
    // }
    obj.squarePowers = {}
    return obj;
  }));
  // console.table(grid);
}

//235,60
const solution_1 = (input) => {
  if (input.cell){
    const [ x, y ] = input.cell.split(',');
    return calculatePowerLevel(x, y, input.serial);
  } else {
    const grid = calculateGrid(input.serial);
    let maxPower = 0;
    let maxPosition;
    for(let yI = 0; yI < 300; yI++){
      if (yI + 2 > 299 || yI + 1 > 299){
        break;
      }
      for(let xI = 0; xI < 300; xI++){
        if (xI + 2 > 299 || xI + 1 > 299){
          break;
        }
        let cellPower = 0;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            try {
              if (xI === 33 && yI === 45) {
                console.log(`grid[${yI + r}][${xI + c}]`, grid[yI + r][xI + c].power);
              }
              cellPower += grid[yI + r][xI + c].power;
            } catch (e){
              console.log(yI, xI, r, c);
              console.error(e);
              break;
            }
          }
        }
        if (cellPower > maxPower) {
          maxPower = cellPower;
          maxPosition = `${xI},${yI}`;
        }
      }
    }
    return maxPosition;
  }
}

const solution = (input) => {
  if (input.cell){
    const [ x, y ] = input.cell.split(',');
    return calculatePowerLevel(x, y, input.serial);
  } else {
    const grid = calculateGrid(input.serial);
    let maxPower = 0;
    let maxPosition;
    for (let squareSize = 1; squareSize <= 300; squareSize++) {
    // let squareSize = 3;
      for (let yI = 0; yI < 300; yI++) {
        for (let xI = 0; xI < 300; xI++) {
          let squarePower = grid[yI][xI].squarePowers[squareSize - 1] || 0;
          let missingCell = false;
          let squareCheck = 4;
          // if (xI === 90 && yI === 269 && squareSize === squareCheck) {
          //   console.log(`starting power: ${squarePower}`);
          //   console.log(grid[yI][xI]);
          // }
          for (let r = 0; r < squareSize; r++) {
            if (grid[yI + r] === undefined || grid[yI + r][xI + squareSize - 1] === undefined) {
              missingCell = true;
              break;
            }
            // if (xI === 90 && yI === 269 && squareSize === squareCheck){
            //   console.log(`grid[${yI} + ${r}][${xI} + ${squareSize - 1}] power: ${grid[yI + r][xI + squareSize - 1].power}`);
            // }
            squarePower += grid[yI + r][xI + squareSize - 1].power;
          }
          for (let c = 0; c < squareSize - 1; c++) {
            if (grid[yI + squareSize - 1] === undefined || grid[yI + squareSize - 1][xI + c] === undefined) {
              missingCell = true;
              break;
            }
            // if (xI === 90 && yI === 269 && squareSize === squareCheck){
            //   console.log(`grid[${yI} + ${squareSize - 1}][${xI} + ${c}] power: ${grid[yI + squareSize - 1][xI + c].power}`);
            // }
            squarePower += grid[yI + squareSize - 1][xI + c].power;
          }
          if (!missingCell) {
            grid[yI][xI].squarePowers[squareSize] = squarePower;
          }
          if (!missingCell && squarePower > maxPower) {
            maxPower = squarePower;
            maxPosition = `${xI},${yI},${squareSize}`;
            // maxPosition = `${xI},${yI}`;
          }
        }
      }
    }
    // console.log(grid[269][90]);
    // console.log(grid[0][29]);
    return maxPosition;
  }
}

export default solution;
