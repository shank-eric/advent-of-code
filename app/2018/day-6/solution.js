import cTable from 'console.table';

function matchesChar(value, index){
  return value === index; //String.fromCharCode(index + 65) || value === String.fromCharCode(index + 97)
}

function buildGrid(arrayInput) {
  let grid = [];
  let largestX = 0;
  let largestY = 0;
  arrayInput.forEach((coords, index) => {
    let [x, y] = coords.split(', ');
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
  for (let i = 0; i <= largestY; i++) {
    for (let j = 0; j <= largestX; j++) {
      if (!grid[i]) {
        grid[i] = [];
      }
      if (!grid[i][j]) {
        let closestIndex, closestDistance, overlap;
        let distances = arrayInput.forEach((coords, index) => {
          // console.log(coords);
          let [x, y] = coords.split(', ');
          x = parseInt(x);
          y = parseInt(y);
          let distance = Math.abs(i - y) + Math.abs(j - x);
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
    }
  }

  return { grid, largestY, largestX };
}

const solution_1 = function(input){
  let arrayInput = Array.from(input);
  let { grid, largestY, largestX } = buildGrid(arrayInput);
  console.table(grid);

  let largestSize = 0;
  arrayInput.forEach((coords, index) => {
    let onEdge = false;
    for (let i = 0; i <= largestY; i++){
      // console.log(grid[i][0]);
      if (matchesChar(grid[i][0], index)){
        onEdge = true;
        break;
      } else if (matchesChar(grid[i][largestX], index)){
        onEdge = true;
        break;
      }
    }
    if (!onEdge){
      for (let i = 0; i <= largestX; i++){
        if (matchesChar(grid[0][i], index)){
          onEdge = true;
          break;
        } else if (matchesChar(grid[largestY][i], index)){
          onEdge = true;
          break;
        }
      }
    }
    if(!onEdge) {
      console.log(`${index} is not on the edge`);
      let size = 0;
      for (let i = 0; i <= largestY; i++) {
        for (let j = 0; j <= largestX; j++) {
          if (matchesChar(grid[i][j], index)){
            size++;
          }
        }
      }
      if(size > largestSize){
        console.log(`${index} is new largest`)
        largestSize = size;
      }
    }
  });
  return largestSize;
}

const solution = function(input){
  let arrayInput = Array.from(input);
  let { grid, largestY, largestX } = buildGrid(arrayInput);
  // console.table(grid);

  let region = [];
  for (let i = 0; i <= largestY; i++) {
    for (let j = 0; j <= largestX; j++) {
      let distance = arrayInput.reduce((agg, coords) => {
        let [x, y] = coords.split(', ');
        x = parseInt(x);
        y = parseInt(y);
        return agg + Math.abs(i - y) + Math.abs(j - x);
      }, 0);
      if (arrayInput.length < 10){
        if (distance < 32) {
          region.push(`${j}, ${i}`);
        }
      } else if (distance < 10000){
        region.push(`${j}, ${i}`);
      }
    }
  }
  //   let onEdge = false;
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
}

export default solution;
