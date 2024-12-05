const tests_1 = [
  {
    "name": "123456789012",
    "input": {
      "data": "123456789012",
      "width": 3,
      "height": 2
    },
    "expectedResult": 1
    // "expectedResult": '[["123","456"],["789","012"]]'
  }
]

const tests = [
  {
    name: "0222112222120000",
    input: {
      data: '0222112222120000',
      width: 2,
      height: 2
    },
    expectedResult: JSON.stringify('\n.1\n1.\n')
  }
]

export default tests;