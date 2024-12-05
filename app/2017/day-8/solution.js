import util from 'util';

//4559 is too low
const solution_1 = function(inputs){
  let registers = {};
  // inputs.forEach((input) => {
  for(let i = 0; i < inputs.length; i++){
    let input = inputs[i];
    // let [ action, evalString ] = input.split(' if ');
    // let [ register, incDec, amount ] = action.split(' ');
    let [ register, incDec, amount, _if, regCheck, check, valueCheck ] = input.split(' ');
    if (registers[register] === undefined){
      registers[register] = 0;
    }
    if (registers[regCheck] === undefined){
      registers[regCheck] = 0;
    }
    amount = parseInt(amount);
    valueCheck = parseInt(valueCheck);
    check = check === '==' ? '===' : check;
    check = check === '!=' ? '!==' : check;
    let evalCheck = `${registers[regCheck]} ${check} ${valueCheck}`;
    // console.log(evalCheck);
    if (eval(evalCheck)){
      let evalAction = `registers[register] = ${registers[register]} ${incDec === 'inc' ? '+' : '-'} ${amount}`;
      // console.log(evalAction);
      eval(evalAction);
    }
    // console.log(util.inspect(registers));
    // if (i > 10){
    //   break;
    // }

  };
  return Math.max.apply(null, Object.values(registers));
}

const solution = function(inputs){
  let registers = {};
  let max;
  // inputs.forEach((input) => {
  for(let i = 0; i < inputs.length; i++){
    let input = inputs[i];
    // let [ action, evalString ] = input.split(' if ');
    // let [ register, incDec, amount ] = action.split(' ');
    let [ register, incDec, amount, _if, regCheck, check, valueCheck ] = input.split(' ');
    if (registers[register] === undefined){
      registers[register] = 0;
    }
    if (registers[regCheck] === undefined){
      registers[regCheck] = 0;
    }
    amount = parseInt(amount);
    valueCheck = parseInt(valueCheck);
    check = check === '==' ? '===' : check;
    check = check === '!=' ? '!==' : check;
    let evalCheck = `${registers[regCheck]} ${check} ${valueCheck}`;
    // console.log(evalCheck);
    if (eval(evalCheck)){
      let evalAction = `registers[register] = ${registers[register]} ${incDec === 'inc' ? '+' : '-'} ${amount}`;
      // console.log(evalAction);
      eval(evalAction);
    }
    // console.log(util.inspect(registers));
    // if (i > 10){
    //   break;
    // }
    let currMax = Math.max.apply(null, Object.values(registers));
    if (max === undefined || max < currMax){
      max = currMax;
    }
  };
  return max
}

export default solution;