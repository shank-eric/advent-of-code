import 'console.table';
import bind from 'bind-decorator';

class Grid {
  constructor(){
    this.grid = [ [ 'O' ] ];
    this.size = {
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0
    }
  }

  markPosition(x, y, char){
    if (!this.grid[x]) {
      this.grid[x] = [];
    }
    if(this.grid[x][y] && this.grid[x][y] !== char){
      console.log(`placing an X at ${x},${y}`)
      this.grid[x][y] = 'X';
    } else {
      this.grid[x][y] = char;
    }
    if (x > this.size.xMax){
      this.size.xMax = x;
    }
    if (x < this.size.xMin){
      this.size.xMin = x;
    }
    if (y > this.size.yMax){
      this.size.yMax = y;
    }
    if (y < this.size.yMin){
      this.size.yMin = y;
    }
  }

  printGrid(){
    for (let y = this.size.yMax; y >= this.size.yMin; y--){
      let row = '';
      for (let x = this.size.xMin; x <= this.size.xMax; x++){
        row += this.grid[x][y] || '.';
      }
      console.log(row);
    }
  }

  findClosestIntersectionByManhattan() {
    this.findIntersections();
    let closestIntersection = this.intersections[0].manhattanDistance;
    this.intersections.forEach(intersection => {
      if (intersection.manhattanDistance < closestIntersection){
        closestIntersection = intersection.manhattanDistance;
      }
    });
    return closestIntersection;
  }

  findIntersections(){
    const absMaxX = Math.max(this.size.xMax, Math.abs(this.size.xMin));
    const absMaxY = Math.max(this.size.yMax, Math.abs(this.size.yMin));
    const largestDimension = Math.max(absMaxX, absMaxY);
    this.intersections = [];
    for (let i = 1; i <= largestDimension; i++){
      for (let x = -i; x <= i; x++){
        if (this.grid[x]) {
          if (this.grid[x][i] === 'X') {
            this.intersections.push({ x, y: i, manhattanDistance: Math.abs(i) + Math.abs(x), distances: {} })
          }
        }
      }
      for (let y = -i; y <= i; y++){
        if (this.grid[i]) {
          if (this.grid[i][y] === 'X') {
            this.intersections.push({ x: i, y, manhattanDistance: Math.abs(i) + Math.abs(y), distances: {} })
          }
        }
      }
    }
  }

  findClosestIntersectionByPath(){
    let closestIntersection;
    this.intersections.forEach(intersection => {
      intersection.pathDistance = Object.values(intersection.distances).reduce((sum, val) => sum += val, 0);
      if (!closestIntersection || intersection.pathDistance < closestIntersection){
        closestIntersection = intersection.pathDistance;
      }
    });
    return closestIntersection;
  }

  checkIntersection(x, y, char, distance){
    const intersection = this.intersections.find(int => int.x === x && int.y === y);
    if (intersection){
      intersection.distances[char] = distance;
    }
  }
}

class Path {
  constructor(grid, char, instructions){
    this.char = char;
    this.grid = grid;
    this.posX = 0;
    this.posY = 0;
    this.instructions = this.parseInstructions(instructions);
  }

  parseInstructions(instructions){
    const moveFunctions = {
      'R': this.moveRight,
      'L': this.moveLeft,
      'U': this.moveUp,
      'D': this.moveDown
    }
    return instructions.map(instruction => {
      const instr = {
        direction: instruction[0],
        distance: parseInt(instruction.substring(1))
      };
      instr.move = (callback) => moveFunctions[instr.direction](instr.distance, callback);
      return instr;
    });
  }

  markPath() {
    this.instructions.forEach(instruction => {
      instruction.move(this.markPosition)
      // console.log(instruction);
      // this.grid.printGrid();
      // console.log('------------------------------')
    });
  }

  findIntersections() {
    this.posX = 0;
    this.posY = 0;
    this.totalDistance = 0;
    this.instructions.forEach(instruction => {
      instruction.move(() => {
        this.totalDistance++;
        this.checkIntersection();
      })
    });
  }

  @bind
  moveUp(distance, callback){
    // console.log(`Move Up ${distance}`);
    for(let i = 0; i < distance; i++){
      this.posY++;
      callback();
    }
  }

  @bind
  moveDown(distance, callback){
    // console.log(`Move Down ${distance}`);
    for(let i = 0; i > -distance; i--){
      this.posY--;
      callback();
    }
  }

  @bind
  moveLeft(distance, callback){
    // console.log(`Move Left ${distance}`);
    for(let i = 0; i > -distance; i--){
      this.posX--;
      callback();
    }
  }

  @bind
  moveRight(distance, callback){
    // console.log(`Move Right ${distance}`);
    for(let i = 0; i < distance; i++){
      this.posX++;
      callback();
    }
  }

  @bind
  markPosition() {
    this.grid.markPosition(this.posX, this.posY, this.char);
  }

  @bind
  checkIntersection(){
    this.grid.checkIntersection(this.posX, this.posY, this.char, this.totalDistance);
  }
}

const solution = function(input) {
  const grid = new Grid();
  const paths = [];
  input.forEach((wire, index) => {
    const instructions = wire.split(',');
    const path = new Path(grid, String.fromCharCode(97 + index), instructions);
    path.markPath();
    paths.push(path);
  });
  grid.findIntersections();
  paths.forEach(path => path.findIntersections());
  // grid.printGrid();
  return grid.findClosestIntersectionByPath();
  // return grid.findClosestIntersectionByManhattan();
}

//solution 1 = 4981
export default solution;


