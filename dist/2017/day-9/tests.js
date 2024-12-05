"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var tests_1 = [{
  "input": "{}",
  "expectedResult": 1
}, {
  "input": "{{{}}}",
  "expectedResult": 6
}, {
  "input": "{{},{}}",
  "expectedResult": 5
}, {
  "input": "{{{},{},{{}}}}",
  "expectedResult": 16
}, {
  "input": "{<a>,<a>,<a>,<a>}",
  "expectedResult": 1
}, {
  "input": "{{<ab>},{<ab>},{<ab>},{<ab>}}",
  "expectedResult": 9
}, {
  "input": "{{<!!>},{<!!>},{<!!>},{<!!>}}",
  "expectedResult": 9
}, {
  "input": "{{<a!>},{<a!>},{<a!>},{<ab>}}",
  "expectedResult": 3
}];
var tests = [{
  "input": "<>",
  "expectedResult": 0
}, {
  "input": "<random characters>",
  "expectedResult": 17
}, {
  "input": "<<<<>",
  "expectedResult": 3
}, {
  "input": "<{!>}>",
  "expectedResult": 2
}, {
  "input": "<!!>",
  "expectedResult": 0
}, {
  "input": "<!!!>>",
  "expectedResult": 0
}, {
  "input": "<{o\"i!a,<{i<a>",
  "expectedResult": 10
}];
var _default = tests;
exports.default = _default;