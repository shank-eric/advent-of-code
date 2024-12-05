import { permutate } from '../helpers';

class IntCode {
  constructor(instructions, inputArray) {
    this.instructions = instructions;
    this.inputArray = inputArray;
    this.position = BigInt(0);
    this.inputCounter = 0;
    this.halted = false;
    this.relativeBase = BigInt(0);
    this.output = [];
  }

  addInput(input){
    this.inputArray.push(input);
  }

  isHalted(){
    return this.halted;
  }

  processOp(haltOnOutput) {
    this.operation = this.parseOperation();
    let loops = 0;
    while (!this.halted) {
      // this.logstructions();
      // this.logoperation(haltOnOutput);
      switch (this.operation.opCode) {
        case 1:
          this.operation.newVal = this.operation.param1.value + this.operation.param2.value;
          this.instructions[this.operation.param3.instruction] = this.operation.newVal;
          this.position += BigInt(4);
          break;
        case 2:
          this.operation.newVal = this.operation.param1.value * this.operation.param2.value;
          this.instructions[this.operation.param3.instruction] = this.operation.newVal;
          this.position += BigInt(4);
          break;
        case 3:
          this.instructions[this.operation.param1.instruction] = this.inputArray[this.inputCounter];
          this.inputCounter++;
          this.position += BigInt(2);
          break;
        case 4:
          this.output.push(this.operation.param1.value);
          this.position += BigInt(2);
          if (haltOnOutput){
            return this.output;
          }
          break;
        case 5:
          if (this.operation.param1.value !== BigInt(0)) {
            this.position = this.operation.param2.value;
          } else {
            this.position += BigInt(3);
          }
          break;
        case 6:
          if (this.operation.param1.value === BigInt(0)) {
            this.position = this.operation.param2.value;
          } else {
            this.position += BigInt(3);
          }
          break;
        case 7:
          this.instructions[this.operation.param3.instruction] = this.operation.param1.value < this.operation.param2.value ? BigInt(1) : BigInt(0);
          this.position += BigInt(4);
          break;
        case 8:
          this.instructions[this.operation.param3.instruction] = this.operation.param1.value === this.operation.param2.value ? BigInt(1) : BigInt(0);
          this.position += BigInt(4);
          break;
        case 9:
          this.relativeBase += this.operation.param1.value;
          this.position += BigInt(2);
          break;
        case 99:
          this.halted = true;
          break;
        default:
          this.logstructions();
          throw new Error(`'oh no :{, ${this.operation.opCode}, ${this.position}`);
          break;
      }
      loops++;
      // if (loops > 25){
      //   return;
      // }
      this.operation = this.parseOperation();
    }
    // this.logstructions();
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

    // operation.param1.immediate = operation.param1.mode === 1;
    // operation.param2.immediate = operation.param2.mode === 1;
    // operation.param3.immediate = operation.param3.mode === 1;

    for (let i = BigInt(1); i <= BigInt(3); i++) {
      let currentParam = operation[`param${i}`];
      currentParam.instruction = this.instructions[this.position + i];
      switch (currentParam.mode) {
        case 0:
          currentParam.value = this.instructions[currentParam.instruction];
          break;
        case 1:
          currentParam.value = currentParam.instruction;
          break;
        case 2:
          currentParam.instruction = this.instructions[this.position + i] + this.relativeBase;
          currentParam.value = this.instructions[currentParam.instruction];
          break;
        default:
          throw new Error(`not a valid parameter mode: ${currentParam.mode}`)
          break;
      }
      if (currentParam.value === undefined){
        currentParam.value = BigInt(0);
      }
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
        console.log(`add ${this.operation.param1.value} to ${this.operation.param2.value} and store value in element ${this.operation.param3.instruction}`);
        break;
      case 2:
        console.log(`multiply ${this.operation.param1.value} by ${this.operation.param2.value} and store value in element ${this.operation.param3.instruction}`);
        break;
      case 3:
        console.log(`store ${this.inputArray[this.inputCounter]} in element ${this.operation.param1.instruction}`);
        break;
      case 4:
        console.log(`output ${this.operation.param1.value}${haltOnOutput ? ' and halt' : ''}`);
        break;
      case 5:
        if (this.operation.param1.value !== 0) {
          console.log(`set current position from ${this.position} to ${this.operation.param2.instruction}`);
        } else {
          console.log(`increase current position ${this.position} by 3`);
        }
        break;
      case 6:
        if (this.operation.param1.value === 0) {
          console.log(`set current position from ${this.position} to ${this.operation.param2.value}`);
        } else {
          console.log(`increase position: ${this.position} += 3`);
        }
        break;
      case 7:
        console.log(`set element ${this.operation.param3.instruction} to ${this.operation.param1.value < this.operation.param2.value ? 1 : 0}`);
        break;
      case 8:
        console.log(`set element ${this.operation.param3.instruction} to ${this.operation.param1.value === this.operation.param2.value ? 1 : 0}`);
        break;
      case 9:
        console.log(`update relative base: ${this.relativeBase} += ${this.operation.param1.value}`);
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

const solution = function(input){
  let bigInput = input.map(val => BigInt(val));
  let machine = new IntCode(bigInput.slice(0), [ BigInt(2) ]);
  return String(machine.processOp());
}

export default solution;


