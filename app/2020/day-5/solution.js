const processOp = function(instructions, input){
  let newVal;
  let position = 0;
  let operation = parseOperation(instructions, position);
  let output;
  while(operation.opCode !== 99){
    let firstParam, secondParam, firstVal, secondVal;
    // let logstructions = instructions.slice(0);
    // logstructions[position] = `<< ${instructions[position]} >>`;
    // console.log(logstructions.join(', '));
    switch (operation.opCode) {
      case 1:
        operation.newVal = operation.param1.value + operation.param2.value;
        instructions[operation.param3.instruction] = operation.newVal;
        position += 4;
        break;
      case 2:
        operation.newVal = operation.param1.value * operation.param2.value;
        instructions[operation.param3.instruction] = operation.newVal;
        position += 4;
        break;
      case 3:
        instructions[operation.param1.instruction] = input;
        position += 2;
        break;
      case 4:
        output = operation.param1.value;
        console.log('output:', output);
        position += 2;
        break;
      case 5:
        if (operation.param1.value !== 0){
          position = operation.param2.value;
        } else {
          position += 3;
        }
        break;
      case 6:
        if (operation.param1.value === 0){
          position = operation.param2.value;
        } else {
          position += 3;
        }
        break;
      case 7:
        instructions[operation.param3.instruction] = operation.param1.value < operation.param2.value ? 1 : 0;
        position += 4;
        break;
      case 8:
        instructions[operation.param3.instruction] = operation.param1.value === operation.param2.value ? 1 : 0;
        position += 4;
        break;
      case 99:
        break;
      default:
        console.log(logstructions.join(', '));
        console.log(operation);
        throw new Error(`'oh no :{, ${operation.opCode}, ${position}`);
        break;
    }
    // console.log(operation);
    operation = parseOperation(instructions, position);
  }
  // let logstructions = instructions.slice(0);
  // logstructions[position] = `<< ${instructions[position]} >>`;
  // console.log(logstructions.join(', '));
  // console.log(operation);
  // return instructions.join(',');
  return output;
  // return input[0];
}

const parseOperation = function(instructions, position){
  const opCode = instructions[position];
  const stringCode = String(opCode).padStart(5, '0');
  const [ a, b, c, d, e ] = stringCode;
  // console.log(a, b, c, d, e, stringCode, opCode);
  const operation = {
    param1: { mode: parseInt(c) },
    param2: { mode: parseInt(b) },
    param3: { mode: parseInt(a) },
    opCode: parseInt(`${d}${e}`)
  }

  operation.param1.immediate = operation.param1.mode === 1;
  operation.param2.immediate = operation.param2.mode === 1;
  operation.param3.immediate = operation.param3.mode === 1;

  for (let i = 1; i <= 3; i ++){
    let currentParam = operation[`param${i}`];
    currentParam.instruction = instructions[position + i];
    currentParam.value = currentParam.immediate ? currentParam.instruction : instructions[currentParam.instruction];
  }

  return operation;
}

const addParamsToOperation = function(operation, instructions, position, paramDetails){
  paramDetails.forEach(({ immediate }, index) => {
    operation[`param${index}`] = instructions[position + index + 1];
    operation[`value${index}`] = immediate ? operation[`param${index}`] : instructions[operation[`param${index}`]];
  })
}

const solution = function(input){
  return processOp(input.instructions.slice(0), input.input);
}

export default solution;


