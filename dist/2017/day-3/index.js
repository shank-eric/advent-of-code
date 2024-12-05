"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "tests", {
  enumerable: true,
  get: function get() {
    return _tests.default;
  }
});
Object.defineProperty(exports, "solution", {
  enumerable: true,
  get: function get() {
    return _solution.default;
  }
});
exports.loadData = exports.day = void 0;

var _tests = _interopRequireDefault(require("./tests"));

var _solution = _interopRequireDefault(require("./solution"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var day = 3;
exports.day = day;

var loadData = function loadData() {
  return 347991;
};

exports.loadData = loadData;