const tests_1 = [
  // {
  //   "input": "ne,ne,ne",
  //   "expectedResult": 3
  // },
  // {
  //   "input": "ne,ne,sw,sw",
  //   "expectedResult": 0
  // },
  {
    "input": "ne,ne,s,s",
    "expectedResult": 2
  },
  {
    "input": "nw,nw,ne,ne",
    "expectedResult": 2
  },
  {
    "input": "se,sw,se,sw,sw",
    "expectedResult": 3
  },
  {
    "input": "sw,sw,nw,nw,sw",
    "expectedResult": 5
  }
]

const tests = [
  {
    "input": "ne,ne,ne",
    "expectedResult": 3
  },
  {
    "input": "ne,ne,sw,sw",
    "expectedResult": 2
  },
  {
    "input": "ne,ne,s,s",
    "expectedResult": 2
  },
  {
    "input": "nw,nw,ne,ne",
    "expectedResult": 2
  },
  {
    "input": "se,sw,se,sw,sw",
    "expectedResult": 3
  },
  {
    "input": "sw,sw,nw,nw,sw",
    "expectedResult": 5
  }
]

export default tests;