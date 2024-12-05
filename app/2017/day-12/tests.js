const tests_1 = [
  {
    "input": [
      "0 <-> 2",
      "1 <-> 1",
      "2 <-> 0, 3, 4",
      "3 <-> 2, 4",
      "4 <-> 2, 3, 6",
      "5 <-> 6",
      "6 <-> 4, 5"
    ],
    "expectedResult": 6
  }
]

const tests = [
  {
    "input": [
      "0 <-> 2",
      "1 <-> 1",
      "2 <-> 0, 3, 4",
      "3 <-> 2, 4",
      "4 <-> 2, 3, 6",
      "5 <-> 6",
      "6 <-> 4, 5"
    ],
    "expectedResult": 2
  }
]

export default tests;