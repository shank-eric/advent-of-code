"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var tests_1 = [{
  "input": 'aA',
  "expectedResult": 0
}, {
  "input": 'abBA',
  "expectedResult": 0
}, {
  "input": 'abAB',
  "expectedResult": 4
}, {
  "input": 'aabAAb',
  "expectedResult": 6
}, {
  "input": 'dabAcCaCBAcCcaDA',
  "expectedResult": 10
}];
var tests = [{
  "input": 'dabAcCaCBAcCcaDA',
  "expectedResult": 4
}];
var _default = tests;
exports.default = _default;