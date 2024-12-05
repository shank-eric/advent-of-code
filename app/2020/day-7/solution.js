import { permutate } from '../helpers';

class IntCode {
  constructor(instructions, inputArray) {
    this.instructions = instructions;
    this.inputArray = inputArray;
    this.position = 0;
    this.inputCounter = 0;
    this.halted = false;
  }

  addInput(input){
    this.inputArray.push(input);
  }

  isHalted(){
    return this.halted;
  }

  processOp(haltOnOutput) {
    this.operation = this.parseOperation();
    while (!this.halted) {
      // this.logstructions();
      // this.logoperation(haltOnOutput);
      switch (this.operation.opCode) {
        case 1:
          this.operation.newVal = this.operation.param1.value + this.operation.param2.value;
          this.instructions[this.operation.param3.instruction] = this.operation.newVal;
          this.position += 4;
          break;
        case 2:
          this.operation.newVal = this.operation.param1.value * this.operation.param2.value;
          this.instructions[this.operation.param3.instruction] = this.operation.newVal;
          this.position += 4;
          break;
        case 3:
          this.instructions[this.operation.param1.instruction] = this.inputArray[this.inputCounter];
          this.inputCounter++;
          this.position += 2;
          break;
        case 4:
          this.output = this.operation.param1.value;
          this.position += 2;
          if (haltOnOutput){
            return this.output;
          }
          break;
        case 5:
          if (this.operation.param1.value !== 0) {
            this.position = this.operation.param2.value;
          } else {
            this.position += 3;
          }
          break;
        case 6:
          if (this.operation.param1.value === 0) {
            this.position = this.operation.param2.value;
          } else {
            this.position += 3;
          }
          break;
        case 7:
          this.instructions[this.operation.param3.instruction] = this.operation.param1.value < this.operation.param2.value ? 1 : 0;
          this.position += 4;
          break;
        case 8:
          this.instructions[this.operation.param3.instruction] = this.operation.param1.value === this.operation.param2.value ? 1 : 0;
          this.position += 4;
          break;
        case 99:
          this.halted = true;
          break;
        default:
          this.logstructions();
          throw new Error(`'oh no :{, ${this.operation.opCode}, ${this.position}`);
          break;
      }
      this.operation = this.parseOperation();
    }
    return this.output;
  }

  parseOperation() {
    const opCode = this.instructions[this.position];
    const stringCode = String(opCode).padStart(5, '0');
    const [a, b, c, d, e] = stringCode;
    const operation = {
      param1: {mode: parseInt(c)},
      param2: {mode: parseInt(b)},
      param3: {mode: parseInt(a)},
      opCode: parseInt(`${d}${e}`)
    }

    operation.param1.immediate = operation.param1.mode === 1;
    operation.param2.immediate = operation.param2.mode === 1;
    operation.param3.immediate = operation.param3.mode === 1;

    for (let i = 1; i <= 3; i++) {
      let currentParam = operation[`param${i}`];
      currentParam.instruction = this.instructions[this.position + i];
      currentParam.value = currentParam.immediate ? currentParam.instruction : this.instructions[currentParam.instruction];
    }

    return operation;
  }

  logstructions(){
    let logstructions = this.instructions.slice(0);
    logstructions[this.position] = `<< ${this.instructions[this.position]} >>`;
    console.log(logstructions.join(', '));
  }

  logoperation(haltOnOutput){
    // console.log(this.operation);
    switch (this.operation.opCode) {
      case 1:
        console.log(`${this.operation.param1.value} + ${this.operation.param2.value} => ${this.operation.param3.instruction}`);
        break;
      case 2:
        console.log(`${this.operation.param1.value} * ${this.operation.param2.value} => ${this.operation.param3.instruction}`);
        break;
      case 3:
        console.log(`${this.inputArray[this.inputCounter]} => ${this.operation.param1.instruction}`);
        break;
      case 4:
        console.log(`output ${this.operation.param1.value}${haltOnOutput ? ' and halt' : ''}`);
        break;
      case 5:
        if (this.operation.param1.value !== 0) {
          console.log(`${this.position} <= ${this.operation.param2.instruction}`);
        } else {
          console.log(`${this.position} += 3`);
        }
        break;
      case 6:
        if (this.operation.param1.value === 0) {
          console.log(`${this.position} <= ${this.operation.param2.value}`);
        } else {
          console.log(`${this.position} += 3`);
        }
        break;
      case 7:
        console.log(`${this.operation.param1.value < this.operation.param2.value ? 1 : 0} => ${this.operation.param3.instruction}`);
        break;
      case 8:
        console.log(`${this.operation.param1.value === this.operation.param2.value ? 1 : 0} => ${this.operation.param3.instruction}`);
        break;
      case 99:
        console.log('halt');
        break;
      default:
        console.log('not a valid operation', this.operation);
        break;
    }
  }
}

const solution_1 = function(input){
  let bestThrust = 0;
  for (let phase of permutate([0, 1, 2, 3, 4], 5, 5)){
    let currentInput = 0;
    const engines = {};
    for (let j = 0; j < 5; j++){
      engines[j] = new IntCode(input.slice(0), [ phase[j], currentInput ]);
      currentInput = engines[j].processOp();
    }
    if (currentInput > bestThrust){
      bestThrust = currentInput;
    }
  }
  return bestThrust;
}

const solution = function(input){
  let bestThrust = 0;
  for (let phase of permutate([5, 6, 7, 8, 9], 5, 5)){
  // let phase = [9,8,7,6,5];
    const engines = [];
    for (let j = 0; j < 5; j++) {
      engines.push(new IntCode(input.slice(0), [ phase[j] ]));
    }
    let currentInput = 0;
    let j = 0;
    // let totalLoops = 0;
    while (engines.some(engine => !engine.isHalted())) {
      engines[j].addInput(currentInput);
      currentInput = engines[j].processOp(true);
      j++;
      if (j === 5){
        j = 0;
        console.log('go through the engines again')
      }
      // totalLoops++;
      // if (totalLoops > 100){
      //   return;
      // }
    }
    if (currentInput > bestThrust){
      bestThrust = currentInput;
    }
  }
  return bestThrust;
}

export default solution;


