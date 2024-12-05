import util from 'util';

const solution_1 = function(input){
  let groups = { };
  let currentGroup;
  let isGarbage = false;
  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case '!':
        i++;
        continue;
        break;
      case '<':
        isGarbage = true;
        break;
      case '>':
        isGarbage = false;
        break;
      case '{':
        if (isGarbage){
          continue;
          break;
        } else {
          let newGroup = {
            value: '{',
            children: {},
            score: 1
          };
          if (currentGroup){
            currentGroup.children[i] = newGroup;
            newGroup.score = currentGroup.score + 1;
            newGroup.parent = currentGroup;
          }
          currentGroup = newGroup;
          // console.log(`adding group ${util.inspect(currentGroup)} at index ${i}`);
          groups[i] = currentGroup;
        }
        break;
      case '}':
        if (isGarbage){
          continue;
          break;
        } else {
          currentGroup.value += '}';
          if (currentGroup.parent){
            currentGroup = currentGroup.parent;
          } else {
            currentGroup = {
              value: '',
              children: {}
            }
          }
        }
        break;
      default:
        currentGroup.value += input[i];
        break;
    }
  }
  // console.log(util.inspect(groups, { depth: 5 }));
  let sum = 0;
  Object.entries(groups).forEach(([ index, group ]) => {
    sum += group.score;
  });
  return sum;
}

const solution = function(input){
  let groups = { };
  let currentGroup;
  let isGarbage = false;
  let garbageChars = 0;
  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case '!':
        i++;
        continue;
        break;
      case '<':
        if (isGarbage){
          garbageChars++;
          continue;
          break;
        } else {
          isGarbage = true;
        }
        break;
      case '>':
        isGarbage = false;
        break;
      case '{':
        if (isGarbage){
          garbageChars++;
          continue;
          break;
        } else {
          let newGroup = {
            value: '{',
            children: {},
            score: 1
          };
          if (currentGroup){
            currentGroup.children[i] = newGroup;
            newGroup.score = currentGroup.score + 1;
            newGroup.parent = currentGroup;
          }
          currentGroup = newGroup;
          // console.log(`adding group ${util.inspect(currentGroup)} at index ${i}`);
          groups[i] = currentGroup;
        }
        break;
      case '}':
        if (isGarbage){
          garbageChars++;
          continue;
          break;
        } else {
          currentGroup.value += '}';
          if (currentGroup.parent){
            currentGroup = currentGroup.parent;
          } else {
            currentGroup = {
              value: '',
              children: {}
            }
          }
        }
        break;
      default:
        if (isGarbage) {
          garbageChars++;
          continue;
          break;
        } else {
          currentGroup.value += input[i];
        }
        break;
    }
  }
  // console.log(util.inspect(groups, { depth: 5 }));
  // let sum = 0;
  // Object.entries(groups).forEach(([ index, group ]) => {
  //   sum += group.score;
  // });
  // return sum;
  return garbageChars;
}

export default solution;


