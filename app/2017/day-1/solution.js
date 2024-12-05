const solution_1 = function(input){
  let sum = 0;
  let arrayInput = Array.from(input);
  arrayInput.forEach((val, index) => {
    let nextVal = index + 1 === arrayInput.length ? arrayInput[0] : arrayInput[index + 1];
    if(val === nextVal){
      sum += parseInt(val);
    }
  });
  return sum;
}

const solution = function(input){
  let sum = 0;
  let arrayInput = Array.from(input);
  arrayInput.forEach((val, index) => {
    let nextPosition = index + (arrayInput.length / 2);
    if (nextPosition <= arrayInput.length) {
      let nextVal = arrayInput[nextPosition];
      if (val === nextVal) {
        sum += (parseInt(val) * 2);
      }
    }
  });
  return sum;
}

export default solution;


