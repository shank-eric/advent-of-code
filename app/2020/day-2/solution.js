const solution_1 = function(input){
  let newVal;
  let position = 0;
  let opCode = input[position];
  while(opCode !== 99){
    switch (opCode) {
      case 1:
        newVal = input[input[position + 1]] + input[input[position + 2]];
        input[input[position + 3]] = newVal;
        position += 4;
        break;
      case 2:
        newVal = input[input[position + 1]] * input[input[position + 2]];
        input[input[position + 3]] = newVal;
        position += 4;
        break;
      case 99:
        break;
      default:
        console.log(input);
        throw new Error(`'oh no :{, ${opCode}, ${position}`);
        break;
    }
    opCode = input[position];
  }
  // return input.join(',');
  return input[0];
}

const solution = function(input){
  for(let noun = 0; noun <= 99; noun++){
    for(let verb = 0; verb <= 99; verb++){
      let test = input.slice(0);
      test[1] = noun;
      test[2] = verb;
      let result = solution_1(test);
      if (result === 19690720){
        console.log(100 * noun + verb);
        break;
        break;
      // } else {
        // console.log(`wrong: ${result}`, noun, verb)
      }
    }
  }
}

export default solution;


