import cTable from 'console.table';

const solution_1 = function(input) {
  let curr = input;
  while (true) {
    let reduced = '';
    // console.log(reduced, curr);
    for (let i = 0; i < curr.length; i++) {
      // console.log(i);
      const currCode = curr.charCodeAt(i);
      const nextCode = curr.charCodeAt(i + 1)
      const nextIsUpper = currCode - 32 === nextCode;
      const nextIsLower = currCode + 32 === nextCode;
      if (!(nextIsUpper || nextIsLower)){
        reduced += curr.charAt(i);
      } else {
        i += 1;
      }
    }
    if (reduced === curr){
      break;
    } else {
      curr = reduced;
    }
    // console.log(reduced, curr, reduced === curr);
  }
  return curr.length;
}

function reactPolymer(curr){
  while (true) {
    let reduced = '';
    // console.log(reduced, curr);
    for (let i = 0; i < curr.length; i++) {
      // console.log(i);
      const currCode = curr.charCodeAt(i);
      const nextCode = curr.charCodeAt(i + 1)
      const nextIsUpper = currCode - 32 === nextCode;
      const nextIsLower = currCode + 32 === nextCode;
      if (!(nextIsUpper || nextIsLower)){
        reduced += curr.charAt(i);
      } else {
        i += 1;
      }
    }
    if (reduced === curr){
      break;
    } else {
      curr = reduced;
    }
    // console.log(reduced, curr, reduced === curr);
  }
  return curr;
}


const solution = function(input){
  const units = {};
  for (let char of input){
    if (char.charCodeAt(0) > 90){
      char = String.fromCharCode(char.charCodeAt(0) - 32);
    }
    if (!units[char]){
      units[char] = { upper: char, lower: String.fromCharCode(char.charCodeAt(0) + 32) };
    }
  }
  let shortest;
  Object.values(units).forEach(unit => {
    const lowerRegex = new RegExp(unit.lower, 'g');
    const upperRegex = new RegExp(unit.upper, 'g');
    unit.replacedInput = input.replace(lowerRegex, '').replace(upperRegex, '')
    // console.log(unit);
    unit.polymer = reactPolymer(unit.replacedInput);
    if (!shortest){
      shortest = unit;
    } else if (unit.polymer.length < shortest.polymer.length) {
      shortest = unit;
    }
  });
  return shortest.polymer.length;
}

export default solution;
