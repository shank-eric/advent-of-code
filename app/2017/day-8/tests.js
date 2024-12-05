const tests_1 = [
  {
    "input": [
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10'
    ],
    "expectedResult": 1
  }
]

const tests = [
  {
    "input": [
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10'
    ],
    "expectedResult": 10
  }
]

export default tests;