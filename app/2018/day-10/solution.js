import cTable from 'console.table';
import util from 'util';
import { overwrite } from '../helpers'

const printGrid = (grid, points) => {
  for (let i = grid.minY; i <= grid.maxY; i++) {
    let rowLine = '';
    for (let j = grid.minX; j <= grid.maxX; j++) {
      if (points.some(p => p.currentX === j && p.currentY === i)) {
        rowLine += '#';
      } else {
        rowLine += '.';
      }
    }
    rowLine += '\r\n';
    process.stdout.clearLine();
    process.stdout.write(rowLine);
  }
  process.stdout.write('----------\r\n');
  process.stdout.write('----------\r\n');
  process.stdout.write('----------\r\n');
}

const movePoints = (currGrid, currPoints) => {
  let grid = Object.assign({}, currGrid);
  grid.minX = 0;
  grid.maxX = 0;
  grid.minY = 0;
  grid.maxY = 0;
  const points = currPoints.map((currPoint, index) => {
    const point = Object.assign({}, currPoint);
    point.currentX += point.velocityX;
    point.currentY += point.velocityY;
    if (point.currentX < grid.minX) grid.minX = point.currentX;
    if (point.currentX > grid.maxX) grid.maxX = point.currentX;
    if (point.currentY < grid.minY) grid.minY = point.currentY;
    if (point.currentY > grid.maxY) grid.maxY = point.currentY;
    // if (point.currentX === currGrid.minX || point.currentX === currGrid.maxX ||
    //   point.currentY === currGrid.minY || point.currentY === currGrid.maxY)
    // {
    //   console.log(currPoint, point);
    // }
    return point;
  });
  grid.size = (grid.maxX - grid.minX) * (grid.maxY - grid.minY);
  // console.log(grid, currGrid);
  const shrank = grid.size < currGrid.size;
  return { grid, points, shrank };
}

const resetCursor = (lines) => {
  process.stdout.cursorTo(0);
  process.stdout.write('\x1b[' + lines + 'A')
}

const solution = function(arrayInput){
  let grid = {
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
  };
  let points = arrayInput.map(input => {
    let [ position, velocity ] = input.split(' velocity=<');
    let [ startX, startY ] = position.replace('position=<', '').replace('>').split(', ');
    let [ velocityX, velocityY ] = velocity.replace('>').split(', ');
    startX = parseInt(startX);
    startY = parseInt(startY);
    velocityX = parseInt(velocityX);
    velocityY = parseInt(velocityY);
    if (startX < grid.minX) grid.minX = startX;
    if (startX > grid.maxX) grid.maxX = startX;
    if (startY < grid.minY) grid.minY = startY;
    if (startY > grid.maxY) grid.maxY = startY;
    return {
      currentX: startX,
      currentY: startY,
      velocityX,
      velocityY
    }
  });
  grid.origMinX = grid.minX;
  grid.origMaxX = grid.maxX;
  grid.origMinY = grid.minY;
  grid.origMaxY = grid.maxY;
  grid.size = (grid.maxX - grid.minX) * (grid.maxY - grid.minY);
  console.log(grid);

  let shrinking = true;
  let iterations = 0;
  while(shrinking){
    // printGrid(grid, points);
    let { grid: newGrid, points: newPoints, shrank} = movePoints(grid, points);
    if (shrank){
      grid = newGrid;
      points = newPoints;
      iterations++;
    } else {
      shrinking = false;
      // console.log(grid);
      printGrid(grid, points);
    }
  }
  console.log(iterations);
}
export default solution;
