import cTable from 'console.table';
import util from 'util';

const solution_1 = function({ players, marbles }){
  let playerScores = new Array(players).fill(0);
  let current = 1;
  let circle = [ 0, 2, 1 ];
  for (let i = 3; i <= marbles; i++){
    if (i % 23 === 0){
      let playerIndex = i % parseInt(players);
      if (!playerScores[playerIndex]){
        playerScores[playerIndex] = 0;
      }
      playerScores[playerIndex] += i;
      let removeIndex = current - 7;
      playerScores[playerIndex] += circle.splice(removeIndex, 1)[0];
      current = removeIndex > 0 ? removeIndex : circle.length + removeIndex + 1;
    } else {
      let next1 = current + 1 >= circle.length ? 0 : current + 1;
      let next2 = next1 + 1 > circle.length ? 0 : next1 + 1;
      circle.splice(next2, 0, i);
      current = next2;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`processing marble ${i} of ${marbles} || ${i / marbles}%`);
  }
  // console.log(playerScores);
  return Math.max(...playerScores);
}

var removeOne = function(arr, index) {
  var len=arr.length;
  if (!len) { return }
  const one = arr[index];
  while (index < len) {
    arr[index] = arr[index+1];
    index++;
  }
  arr.length--;
  return one;
};

var addOne = function(arr, index, value){
  let len = arr.length;
  while (len > index) {
    arr[len] = arr[len-1];
    len--;
  }
  arr[index] = value;
}

const solution_2 = function({ players, marbles }){
  let playerScores = new Array(players).fill(0);
  let current = 1;
  let circle = [ 0, 2, 1 ];
  for (let i = 3; i <= marbles; i++){
    if (i % 23 === 0){
      let playerIndex = i % parseInt(players);
      if (!playerScores[playerIndex]){
        playerScores[playerIndex] = 0;
      }
      playerScores[playerIndex] += i;
      let removeIndex = current - 7;
      // playerScores[playerIndex] += circle.splice(removeIndex, 1)[0];
      // current = removeIndex > 0 ? removeIndex : circle.length + removeIndex + 1;
      removeIndex = removeIndex > 0 ? removeIndex : circle.length + removeIndex;
      playerScores[playerIndex] += removeOne(circle, removeIndex);
      current = removeIndex;
    } else {
      let next1 = current + 1 >= circle.length ? 0 : current + 1;
      let next2 = next1 + 1 > circle.length ? 0 : next1 + 1;
      addOne(circle, next2, i);
      current = next2;
    }
    // console.log(circle);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`processing marble ${i} of ${marbles} || ${i / marbles * 100}%`);
  }
  // console.log(playerScores);
  return Math.max(...playerScores);
}

const solution = function({ players, marbles }){
  let playerScores = new Array(players).fill(0);
  // let current = 1;
  // let circle = [ 0, 2, 1 ];
  const zero = { value: 0 };
  const two = { value: 2, prev: zero };
  const one = { value: 1, prev: two, next: zero };
  zero.next = two;
  zero.prev = one;
  two.next = one;
  let circleLength = 3;
  let current = two;
  // let log = zero;
  // let logString = '';
  // for(let j = 0; j < circleLength; j++){
  //   // process.stdout.write(`${log.value}`);
  //   logString += logString === '' ? log.value : `, ${log.value}`;
  //   log = log.next;
  // }
  // console.log(logString);
  for (let i = 3; i <= marbles; i++){
    if (i % 23 === 0){
      let playerIndex = i % parseInt(players);
      if (!playerScores[playerIndex]){
        playerScores[playerIndex] = 0;
      }
      playerScores[playerIndex] += i;
      let removal = current;
      for(let j = 0; j < 7; j++){
        removal = removal.prev;
      }
      playerScores[playerIndex] += removal.value;
      current = removal.next;
      removal.prev.next = removal.next;
      removal.next.prev = removal.prev;
      circleLength--;
    } else {
      // let next1 = current + 1 >= circleLength ? 0 : current + 1;
      // let next2 = next1 + 1 > circleLength ? 0 : next1 + 1;
      // addOne(circle, next2, i);
      // current = next2;
      // console.log(current);
      const newVal = { value: i, prev: current.next, next: current.next.next };
      current.next.next.prev = newVal;
      current.next.next = newVal;
      circleLength++;
      current = newVal;
    }
    // let log = zero;
    // let logString = '';
    // for(let j = 0; j < circleLength; j++){
    //   // process.stdout.write(`${log.value}`);
    //   logString += logString === '' ? log.value : `, ${log.value}`;
    //   log = log.next;
    // }
    // console.log(logString);
    // process.stdout.clearLine();
    // process.stdout.cursorTo(0);
    // process.stdout.write(`processing marble ${i} of ${marbles} || ${i / marbles * 100}%`);
  }
  // console.log(playerScores);
  return Math.max(...playerScores);
}

// const solution = function({ players, marbles }){
//   let playerScores = new Array(players).fill(0);
//   let current = 1;
//   let circle = new Array(marbles);
//   circle[0] = 0;
//   circle[1] = 2;
//   circle[2] = 1;
//   let circleLength = 3;
//   for (let i = 3; i <= marbles; i++){
//     if (i % 23 === 0){
//       let playerIndex = i % parseInt(players);
//       if (!playerScores[playerIndex]){
//         playerScores[playerIndex] = 0;
//       }
//       playerScores[playerIndex] += i;
//       let removeIndex = current - 7;
//       playerScores[playerIndex] += circle.splice(removeIndex, 1)[0];
//       current = removeIndex > 0 ? removeIndex : circleLength + removeIndex + 1;
//     } else {
//       let next1 = current + 1 >= circleLength ? 0 : current + 1;
//       let next2 = next1 + 1 > circleLength ? 0 : next1 + 1;
//       circle[next2] = i;
//       current = next2;
//       console.log(circle);
//     }
//     process.stdout.clearLine();
//     process.stdout.cursorTo(0);
//     process.stdout.write(`processing marble ${i} of ${marbles} || ${i / marbles}%`);
//   }
//   // console.log(playerScores);
//   return Math.max(...playerScores);
// }

export default solution;
