const solution_1 = function(input){
  let sum = 0;
  let arrayInput = Array.from(input);
  arrayInput.forEach((val, index) => {
    sum += parseInt(val.replace('+', ''));
  });
  return sum;
}

const solution = function(input){
  let sum = 0;
  let arrayInput = Array.from(input);
  let position = 0;
  let found = false;
  let duplicateVal;
  const seenValues = { 0: true };
  while (!found){
    const val = parseInt(arrayInput[position].replace('+', ''));
    // console.log(`adding ${val} to ${sum}`);
    sum += val;
    if (seenValues[sum]){
      found = true;
      duplicateVal = sum;
    } else {
      seenValues[sum] = true;
      position++;
      if(position >= arrayInput.length) {
        position = 0;
      }
      // console.log(`haven't seen ${sum}`);
    }
  }
  return duplicateVal;
}

export default solution;


