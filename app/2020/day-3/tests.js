const tests_1 = [
  {
    "input": [
      'R8,U5,L5,D3',
      'U7,R6,D4,L4'
    ],
    "expectedResult": 6
  },
  {
    "input": [
      'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    ],
    "expectedResult": 135
  },
  {
    "input": [
      'R75,D30,R83,U83,L12,D49,R71,U7,L72',
      'U62,R66,U55,R34,D71,R55,D58,R83'
    ],
    "expectedResult": 159
  }
]

const tests = [
  {
    "input": [
      'R8,U5,L5,D3',
      'U7,R6,D4,L4'
    ],
    "expectedResult": 30
  },
  {
    "input": [
      'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    ],
    "expectedResult": 410
  },
  {
    "input": [
      'R75,D30,R83,U83,L12,D49,R71,U7,L72',
      'U62,R66,U55,R34,D71,R55,D58,R83'
    ],
    "expectedResult": 610
  }
]

export default tests;