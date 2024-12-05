const solution = function (input) {
  return input.reduce((acc, calibrationValue) => {
    let firstNumber, lastNumber;
    calibrationValue.split('').forEach((char, index) => {
      if ('0' <= char && char <= '9') {
        if (!firstNumber) {
          firstNumber = { char, index };
        }
        lastNumber = { char, index };
      }
    });
    const numbers = [
      { text: 'one', value: 1 },
      { text: 'two', value: 2 },
      { text: 'three', value: 3 },
      { text: 'four', value: 4 },
      { text: 'five', value: 5 },
      { text: 'six', value: 6 },
      { text: 'seven', value: 7 },
      { text: 'eight', value: 8 },
      { text: 'nine', value: 9 },
    ];
    // console.log(calibrationValue);
    numbers.forEach((number) => {
      const firstIndex = calibrationValue.indexOf(number.text);
      if (firstIndex >= 0) {
        if (!firstNumber || firstIndex < firstNumber.index) {
          firstNumber = { char: number.value, index: firstIndex };
        }
      }
    });

    let currLastIndex;
    do {
      currLastIndex = lastNumber?.index;
      numbers.forEach((number) => {
        const lastIndex = calibrationValue.indexOf(
          number.text,
          lastNumber?.index
        );
        // console.log(lastIndex, number, lastNumber);
        if (lastIndex >= 0) {
          if (!lastNumber || lastIndex > lastNumber.index) {
            lastNumber = { char: number.value, index: lastIndex };
          }
        }
      });
    } while (currLastIndex !== lastNumber?.index);
    if (firstNumber && lastNumber) {
      const number = parseInt(`${firstNumber.char}${lastNumber.char}`);
      console.log(calibrationValue, number, firstNumber, lastNumber);
      if (!isNaN(number)) {
        acc += number;
        // } else {
      }
    }
    return acc;
  }, 0);
};

export default solution;
