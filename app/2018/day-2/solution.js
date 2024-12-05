const solution_1 = function(input){
  let arrayInput = Array.from(input);
  let counts = {};
  let twoLetters = 0;
  let threeLetters = 0;
  arrayInput.forEach((string, index) => {
    counts[string] = {};
    [...string].forEach(letter => {
      if (!counts[string][letter]){
        counts[string][letter] = 1;
      } else {
        counts[string][letter]++;
      }
    })
    if (Object.values(counts[string]).some(val => val === 2)){
      twoLetters++;
    }
    if (Object.values(counts[string]).some(val => val === 3)){
      threeLetters++;
    }
    console.log(twoLetters, threeLetters);
  });
  return twoLetters * threeLetters;
}

const solution = function(input) {
  const options = {};
  let found;
  let arrayInput = Array.from(input);
  arrayInput.forEach((string, index) => {
    for(let i = 0; i < string.length; i++){
      const sliced = string.slice(0, i) + string.slice(i + 1, string.length);
      // console.log(sliced)
      if (options[sliced] && options[sliced] !== string){
        found = sliced;
        // console.log(options);
        break;
      } else {
        options[sliced] = string;
      }
    }
  });
  return found;
}

export default solution;

//wrong answers:
// yuxwcbzrmdvpsjgklthnlioqe
// yuxwcbzrmdvpsjgklthnlioqe