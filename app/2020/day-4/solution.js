const checkPassword_1 = function(number){
  let hasDouble = false;
  for(let i = 0; i < 6; i++){
    if (i > 0){
      if (number[i - 1] > number[i]){
        return false;
      }
      if (!hasDouble && number[i - 1] === number[i]){
        hasDouble = true;
      }
    }
  }
  return hasDouble;
}


const checkPassword = function(number){
  let hasDouble = false;
  let matchesPrev = 0;
  for(let i = 0; i < 6; i++){
    if (i > 0){
      if (number[i - 1] > number[i]){
        return false;
      }
      if (!hasDouble) {
        if (number[i - 1] === number[i]){
          matchesPrev++;
        } else {
          if (matchesPrev === 1){
            hasDouble = true;
          }
          matchesPrev = 0;
        }
        // if (i === 5){
        //   if (number[i - 1] === number[i] && number[i] !== number[i - 2]){
        //     hasDouble = true;
        //   }
        // } else if (number[i - 1] === number[i] && number[i] !== number[i + 1]) {
        //   console.log(number, i, number[i - 1], number[i], number[i + 1])
        //   hasDouble = true;
        // }
      }
    }
  }
  if (matchesPrev === 1){
    hasDouble = true;
  }
  return hasDouble;
}

const solution = function(input){
  const stringInput = String(input);
  if (stringInput.length === 6){
    return checkPassword(stringInput);
  } else {
    // return false;
    const [ start, end ] = stringInput.split('-');
    let validPasswords = 0;
    for (let i = parseInt(start); i <= parseInt(end); i++){
      if (checkPassword(String(i))){
        console.log(`${i} passed`)
        validPasswords++;
      }
    }
    return validPasswords;
  }
}

export default solution;