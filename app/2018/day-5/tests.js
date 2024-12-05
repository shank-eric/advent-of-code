const tests_1 = [
  {
    "input": 'aA',
    "expectedResult": 0
  },
  {
    "input": 'abBA',
    "expectedResult": 0
  },
  {
    "input": 'abAB',
    "expectedResult": 4
  },
  {
    "input": 'aabAAb',
    "expectedResult": 6
  },
  {
    "input": 'dabAcCaCBAcCcaDA',
    "expectedResult": 10
  }
]

const tests = [
  {
    "input": 'dabAcCaCBAcCcaDA',
    "expectedResult": 4
  }
]

export default tests;
