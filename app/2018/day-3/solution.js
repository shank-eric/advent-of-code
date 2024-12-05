import cTable from 'console.table';

function setupFabric(input){
  const fabric = [];
  arrayInput.forEach(string => {
    // '#1 @ 1,3: 4x4',
    console.log(string);
    const [ id, rest ] = string.split(' @ ');
    const [ coords, size ] = rest.split(': ');
    let [ x, y ] = coords.split(',');
    let [ width, height ] = size.split('x');
    x = parseInt(x);
    y = parseInt(y);
    width = parseInt(width);
    height = parseInt(height);
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        fabric[i] = fabric[i] || [];
        if (fabric[i][j]) {
          fabric[i][j] = 'X';
        } else {
          fabric[i][j] = id;
        }
      }
    }
  });
  // console.table(fabric);
  return fabric;
}

const solution_1 = function(input) {
  let arrayInput = Array.from(input);
  const fabric = setupFabric(arrayInput);
  let overlap = 0;
  fabric.forEach(row => row.forEach(cell => cell === 'X' && overlap++));
  return overlap
}

const solution = function(input) {
  let arrayInput = Array.from(input);
  const fabric = [];
  const ideas = arrayInput.map(string => {
    // '#1 @ 1,3: 4x4',
    const [ id, rest ] = string.split(' @ ');
    const [ coords, size ] = rest.split(': ');
    let [ x, y ] = coords.split(',');
    let [ width, height ] = size.split('x');
    const idea = {
      id,
      x: parseInt(x),
      y: parseInt(y),
      width: parseInt(width),
      height: parseInt(height)
    };
    for (let i = idea.x; i < idea.x + idea.width; i++) {
      for (let j = idea.y; j < idea.y + idea.height; j++) {
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

  let found;
  ideas.forEach(idea => {
    idea.count = 0;
    fabric.forEach(row => row.forEach(cell => cell === idea.id && idea.count++));
    if (idea.count === idea.size){
      found = idea;
    }
  });

  // console.log(ideas);
  // console.table(fabric);
  return found.id;
}


export default solution;
