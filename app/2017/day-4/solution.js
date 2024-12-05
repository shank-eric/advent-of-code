const solution_1 = function(input){
  let count = 0;
  input.forEach((pass) => {
    let words = pass.split(' ');
    let uniqueWords = Array.from(new Set(words));
    if (words.length === uniqueWords.length){
      count++;
    }
  });
  return count;
}

const solution = function(input){
  let count = 0;
  input.forEach((pass) => {
    let words = pass.split(' ');
    let match = false;
    let wordPropsArray = words.map((word) => {
      let wordArray = Array.from(word);
      let wordProps = {};
      wordArray.forEach((letter) => {
        if (wordProps[letter]){
          wordProps[letter]++;
        } else {
          wordProps[letter] = 1;
        }
      });
      return wordProps;
    })
    for(let i = 0; i < words.length; i++){
      let word = words[i];
      let wordArray = Array.from(word);
      for(let w = i + 1; w < words.length; w++){
        let nextWord = words[w];
        if (nextWord.length !== word.length){
          continue;
        } else {
          let wordProps = wordPropsArray[i];
          let nextWordProps = wordPropsArray[w];
          match = Object.entries(wordProps).every(([key, value]) => {
            return nextWordProps[key] && nextWordProps[key] === value;
          });
          if (match) {
            console.log(`${word} matched ${nextWord}`);
            break;
          }
        }
      }
      if(match){
        break;
      }
    }
    if (!match){
      console.log(`${pass} is valid!`)
      count++;
    }
  });
  return count;
}

export default solution;