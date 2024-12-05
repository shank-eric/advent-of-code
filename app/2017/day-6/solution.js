import util from 'util';

const solution_1 = function(input){
  input = input.map((i) => parseInt(i));
  console.log(input, input.length);
  let foundScenarios = {};
  let loops = 0;
  let currScenario = '';
  while (true){
    let largestBlock = Math.max.apply(null, input);
    let largestIndex = input.findIndex((i) => i === largestBlock);
    input[largestIndex] = 0;
    // console.log(`largestBlock is ${largestBlock} at index ${largestIndex}`);
    for (let i = 1; i <= largestBlock; i++){
      let index = largestIndex + i;
      if (index >= input.length){
        index = (index % input.length);
      }
      // console.log(`updating index ${index}`);
      input[index]++;
    }
    currScenario = input.join(',');
    loops++;
    if (foundScenarios[currScenario]){
      console.log(`found ${currScenario}`);
      break;
    } else {
      console.log(`adding ${currScenario}`);
      foundScenarios[currScenario] = true;
      // console.log(`scenarios: ${util.inspect(foundScenarios)}`);
      currScenario = '';
    }
  }
  return loops
}

const solution = function(input){
  input = input.map((i) => parseInt(i));
  console.log(input, input.length);
  let foundScenarios = {};
  let loops = 0;
  let currScenario = '';
  while (true){
    let largestBlock = Math.max.apply(null, input);
    let largestIndex = input.findIndex((i) => i === largestBlock);
    input[largestIndex] = 0;
    // console.log(`largestBlock is ${largestBlock} at index ${largestIndex}`);
    for (let i = 1; i <= largestBlock; i++){
      let index = largestIndex + i;
      if (index >= input.length){
        index = (index % input.length);
      }
      // console.log(`updating index ${index}`);
      input[index]++;
    }
    currScenario = input.join(',');
    loops++;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`loops: ${loops}`);
    // if (loops > 10){
    //   break;
    // }
    Object.keys(foundScenarios).forEach((key) => foundScenarios[key]++);
    // console.log(`currScenario: ${currScenario}`);
    // console.log(`scenarios: ${util.inspect(foundScenarios)}`);
    if (foundScenarios[currScenario] !== undefined){
      // console.log(`found ${currScenario}`);
      if (foundScenarios[currScenario] > 0){
        loops = foundScenarios[currScenario];
        break;
      } else {
        foundScenarios[currScenario]++;
      }
    } else {
      // console.log(`adding ${currScenario}`);
      foundScenarios[currScenario] = 0;
      currScenario = '';
    }
  }
  return loops;
}

export default solution;