const solution = function (input) {
  return input.reduce((acc, calibrationValue) => {
    let firstNumber, lastNumber;
    calibrationValue.split('').forEach((char) => {
      if ('0' <= char && char <= '9') {
        if (!firstNumber) {
          firstNumber = char;
        }
        lastNumber = char;
      }
    });
    const number = parseInt(`${firstNumber}${lastNumber}`);
    if (isNaN(number)) {
      console.log(calibrationValue, number, `${firstNumber}${lastNumber}`);
    } else {
      acc += number;
    }
    return acc;
  }, 0);
};

export default solution;
