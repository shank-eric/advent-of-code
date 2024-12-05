const tests_1 = [
  {
    "input": [
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'COM)B',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L'
    ],
    "expectedResult": 42
  }
]

const tests = [
  {
    "input": [
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'COM)B',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L',
      'K)YOU',
      'I)SAN'
    ],
    "expectedResult": 4
  }
]

export default tests;