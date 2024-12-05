"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var tests_1 = [{
  "input": ['Step C must be finished before step A can begin.', 'Step C must be finished before step F can begin.', 'Step A must be finished before step B can begin.', 'Step A must be finished before step D can begin.', 'Step B must be finished before step E can begin.', 'Step D must be finished before step E can begin.', 'Step F must be finished before step E can begin.'],
  "expectedResult": 'CABDFE'
}];
var tests = [{
  "input": ['Step C must be finished before step A can begin.', 'Step C must be finished before step F can begin.', 'Step A must be finished before step B can begin.', 'Step A must be finished before step D can begin.', 'Step B must be finished before step E can begin.', 'Step D must be finished before step E can begin.', 'Step F must be finished before step E can begin.'],
  "expectedResult": 15
}];
var _default = tests;
exports.default = _default;