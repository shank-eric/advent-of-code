const solution_1 = function(input){
  return input.reduce((acc, num) => acc + Math.floor(num / 3) - 2, 0);
}

const solution = function(input) {
  return input.reduce((acc, num) => {
    let currWeight = num;
    while(currWeight > 0) {
      currWeight = Math.floor(currWeight / 3) - 2;
      if (currWeight > 0) {
        acc += currWeight;
      }
    }
    return acc;
  }, 0);
}

export default solution;


