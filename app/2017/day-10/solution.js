import util from 'util';

function knotHashRound(list, input, rounds){
  let currentPosition = 0;
  let skipSize = 0;
  let lengths = input.map((l) => parseInt(l));
  for(let i = 0; i < rounds; i++) {
    lengths.forEach((length) => {
      // length = parseInt(length);
      if (currentPosition + length >= list.length) {
        let wrapPosition = currentPosition + length - list.length - 1;
        let reverseStartHalf = list.slice(0, wrapPosition + 1);
        let reverseEndHalf = list.slice(currentPosition, list.length);
        let middle = list.slice(wrapPosition + 1, currentPosition);
        let reverseArray = reverseEndHalf.concat(reverseStartHalf);
        reverseArray.reverse();
        let secondHalf = reverseArray.slice(0, reverseEndHalf.length);
        let firstHalf = reverseArray.slice(reverseEndHalf.length, reverseArray.length);
        list = firstHalf.concat(middle).concat(secondHalf);
      } else {
        let reverseArray = list.slice(currentPosition, currentPosition + length);
        reverseArray.reverse();
        let firstHalf = list.slice(0, currentPosition);
        let secondHalf = list.slice(currentPosition + length, list.length);
        list = firstHalf.concat(reverseArray).concat(secondHalf);
      }
      currentPosition = (currentPosition + length + skipSize) % list.length;
      skipSize++;
    });
  }
  return list;
}

const solution_1 = function(input){
  let listLength = input.length === 7 ? 5 : 256;
  let list = Array.from(Array(listLength), (x,i) => i);
  input = input.split(',');
  list = knotHashRound(list, input, 1);
  return list[0] * list[1];
}

const solution = function(input){
  let list = Array.from(Array(256), (x,i) => i);
  let lengths = [];
  for(let i = 0; i < input.length; i++){
    lengths.push(input.charCodeAt(i));
  }
  lengths.push(17, 31, 73, 47, 23);
  // console.log(lengths);
  list = knotHashRound(list, lengths, 64);
  if (list.length !== 256){
    throw new Error('wrong length :(');
  }
  let hash = '';
  // a2 58 2a 3a  e66e6e86e3812dcb672a272
  // a2 58 2a 3a 0e66e6e86e3812dcb672a272

  //post-process list
  for(let i = 0; i < 16; i++){
    let start = i * 16;
    let end = start + 16;
    let vals = list.slice(start, end);
    let evalString = vals.join(' ^ ');
    let intVal = eval(evalString);
    let hexVal = intVal.toString(16).padStart(2, '0');
    hash += hexVal;
    // console.log(`${hexVal} = ${intVal} = ${evalString}`);
  }

  return hash;
}

export default solution;