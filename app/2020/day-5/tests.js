const tests_1 = [
  {
    "input": {
      "instructions": [1,9,10,3,2,3,11,0,99,30,40,50],
      "input": 1
    },
    "expectedResult": '3500,9,10,70,2,3,11,0,99,30,40,50'
  },
  {
    "input": {
      "instructions": [1,0,0,0,99],
      "input": 1
    },
    "expectedResult": '2,0,0,0,99'
  },
  {
    "input": {
      "instructions": [2,3,0,3,99],
      "input": 1
    },
    "expectedResult": '2,3,0,6,99'
  },
  {
    "input": {
      "instructions": [2,4,4,5,99,0],
      "input": 1
    },
    "expectedResult": '2,4,4,5,99,9801'
  },
  {
    "input": {
      "instructions": [1,1,1,4,99,5,6,0,99],
      "input": 1
    },
    "expectedResult": '30,1,1,4,2,5,6,0,99'
  },
  {
    "input": {
      "instructions": [3,0,4,0,99],
      "input": 1
    },
    "expectedResult": '1,0,4,0,99'
  },
  {
    "input": {
      "instructions": [1002, 4, 3, 4, 33],
      "input": 1
    },
    "expectedResult": '1002,4,3,4,99'
  },
  {
    "input": {
      "instructions": [1101, 100, -1, 4, 0],
      "input": 1
    },
    "expectedResult": '1101,100,-1,4,99'
  }
]

const tests = [
  // {
  //   "name": "equals 8 true",
  //   "input": {
  //     "instructions": [3,9,8,9,10,9,4,9,99,-1,8],
  //     "input": 8
  //   },
  //   "expectedResult": 1
  // },
  // {
  //   "name": "equals 8 false",
  //   "input": {
  //     "instructions": [3,9,8,9,10,9,4,9,99,-1,8],
  //     "input": 10
  //   },
  //   "expectedResult": 0
  // },
  // {
  //   "name": "less than 8 true",
  //   "input": {
  //     "instructions": [3,9,7,9,10,9,4,9,99,-1,8],
  //     "input": 7
  //   },
  //   "expectedResult": 1
  // },
  // {
  //   "name": "less than 8 false",
  //   "input": {
  //     "instructions": [3,9,7,9,10,9,4,9,99,-1,8],
  //     "input": 8
  //   },
  //   "expectedResult": 0
  // },
  // {
  //   "name": "equals 8 true (immediate)",
  //   "input": {
  //     "instructions": [3,3,1108,-1,8,3,4,3,99],
  //     "input": 8
  //   },
  //   "expectedResult": 1
  // },
  // {
  //   "name": "equals 8 false (immediate)",
  //   "input": {
  //     "instructions": [3,9,8,9,10,9,4,9,99,-1,8],
  //     "input": 10
  //   },
  //   "expectedResult": 0
  // },
  // {
  //   "name": "less than 8 true (immediate)",
  //   "input": {
  //     "instructions": [3,3,1107,-1,8,3,4,3,99],
  //     "input": 7
  //   },
  //   "expectedResult": 1
  // },
  // {
  //   "name": "less than 8 false (immediate)",
  //   "input": {
  //     "instructions": [3,3,1107,-1,8,3,4,3,99],
  //     "input": 8
  //   },
  //   "expectedResult": 0
  // },
  // {
  //   "name": "jump test 0 -> 0",
  //   "input": {
  //     "instructions": [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],
  //     "input": 0
  //   },
  //   "expectedResult": 0
  // },
  // {
  //   "name": "jump test !0 => 1",
  //   "input": {
  //     "instructions": [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],
  //     "input": 10
  //   },
  //   "expectedResult": 1
  // },
  // {
  //   "name": "jump test 0 -> 0 (immediate)",
  //   "input": {
  //     "instructions": [3,3,1105,-1,9,1101,0,0,12,4,12,99,1],
  //     "input": 0
  //   },
  //   "expectedResult": 0
  // },
  // {
  //   "name": "jump test !0 => 1  (immediate)",
  //   "input": {
  //     "instructions": [3,3,1105,-1,9,1101,0,0,12,4,12,99,1],
  //     "input": 10
  //   },
  //   "expectedResult": 1
  // },
  {
    "name": "equals 8",
    "input": {
      "instructions": [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],
      "input": 8
    },
    "expectedResult": 1000
  },
  {
    "name": "less than 8",
    "input": {
      "instructions": [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],
      "input": 5
    },
    "expectedResult": 999
  },
  {
    "name": "greater than 8",
    "input": {
      "instructions": [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],
      "input": 10
    },
    "expectedResult": 1001
  }
]

export default tests;