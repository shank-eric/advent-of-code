const tests = [
  {
    "input": [104,BigInt(1125899906842624),99],
    "expectedResult": "1125899906842624"
  },
  {
    "input": [1102,34915192,34915192,7,4,7,99,0],
    "expectedResult": "1219070632396864"
  },
  {
    "input": [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99],
    "expectedResult": '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
  }
]

export default tests;