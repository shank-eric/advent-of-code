const solution_1 = function(input){
  let currentIndex = 0;
  let steps = 0;
  while (currentIndex < input.length){
    steps++;
    let currentVal = parseInt(input[currentIndex]);
    input[currentIndex]++;
    currentIndex += currentVal;
  }
  return steps;
}

const solution = function(input){
  let currentIndex = 0;
  let steps = 0;
  while (currentIndex < input.length){
    steps++;
    let currentVal = parseInt(input[currentIndex]);
    if (currentVal >= 3) {
      input[currentIndex]--;
    } else {
      input[currentIndex]++;
    }
    currentIndex += currentVal;
  }
  return steps;
}

export default solution;