const solution_1 = function(input){
  let sum = 0;
  input.forEach((row) => {
    let max = parseInt(row[0]);
    let min = max;
    row.forEach((cell) => {
      let val = parseInt(cell);
      if (val > max){
        max = val;
      }
      if (val < min){
        min = val;
      }
    });
    // console.log(max, min, max - min);
    sum += max - min;
  });
  return sum;
}

const solution = function(input){
  let sum = 0;
  input.forEach((row) => {
    row.forEach((cell, index) => {
      let val = parseInt(cell);
      for (let i = index + 1; i < row.length; i++){
        let otherVal = parseInt(row[i]);
        if (val % otherVal === 0){
          sum += val / otherVal
        } else if (otherVal % val === 0){
          sum += otherVal / val;
        }
      }
    });
  });
  return sum;
}

export default solution;