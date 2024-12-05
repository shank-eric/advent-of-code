const tests_1 = [
  {
    "input": [ '+1', '-2', '+3', '+1' ],
    "expectedResult": 3
  },
  {
    "input": [ '+1', '+1', '+1' ],
    "expectedResult": 3
  },
  {
    "input": [ '+1', '+1', '-2' ],
    "expectedResult": 0
  },
  {
    "input": [ '-1', '-2', '-3' ],
    "expectedResult": -6
  }
]

const tests = [
  {
    "input": [ '+1', '-1' ],
    "expectedResult": 0
  },
  {
    "input": [ '+3', '+3', '+4', '-2', '-4' ],
    "expectedResult": 10
  },
  {
    "input": [ '-6', '+3', '+8', '+5', '-6' ],
    "expectedResult": 5
  },
  {
    "input": [ '+7', '+7', '-2', '-7', '-4' ],
    "expectedResult": 14
  }
]

export default tests;