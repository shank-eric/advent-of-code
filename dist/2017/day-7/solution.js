"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function buildTower(input) {
  var tower = {};
  input.forEach(function (data) {
    var _data$split = data.split(' -> '),
        _data$split2 = _slicedToArray(_data$split, 2),
        programWithWeight = _data$split2[0],
        dependentsData = _data$split2[1];

    var _programWithWeight$sp = programWithWeight.split(' ('),
        _programWithWeight$sp2 = _slicedToArray(_programWithWeight$sp, 2),
        program = _programWithWeight$sp2[0],
        weight = _programWithWeight$sp2[1];

    weight = parseInt(weight.replace(')', ''));
    tower[program] = {
      weight: weight,
      dependents: []
    };

    if (dependentsData) {
      tower[program].dependentsData = dependentsData.split(', ');
    }
  });

  while (Object.keys(tower).length > 1) {
    Object.entries(tower).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      if (value.dependentsData) {
        value.dependentsData.forEach(function (dep) {
          value.dependents.push(tower[dep]);
          delete tower[dep];
        });
      }
    });
  }

  return tower;
}

var solution_1 = function solution_1(input) {
  var tower = buildTower(input);
  return Object.keys(tower)[0];
};

var solution = function solution(input) {
  var tower = buildTower(input);
  var unbalanced = [];

  function calcWeight(program) {
    var dependentsWeight = 0;

    if (program.dependents.length > 0) {
      program.dependents.forEach(function (dep) {
        dependentsWeight += calcWeight(dep);
      });

      if (dependentsWeight / program.dependents.length !== program.dependents[0].totalWeight) {
        unbalanced.push(program);
      }
    }

    program.totalWeight = program.weight + dependentsWeight;
    return program.totalWeight;
  }

  var rootTower = tower[Object.keys(tower)[0]];
  calcWeight(rootTower);
  console.log(unbalanced);
  var desiredWeight = unbalanced[0].dependents[0].totalWeight;

  if (desiredWeight === unbalanced[0].dependents[1].totalWeight) {//do nothing, two weights match, must be desired weight
  } else {
    // weight of 0 and 1 didn't match, need to check 2
    if (desiredWeight === unbalanced[0].dependents[2].totalWeight) {//do nothing, 1 was the odd one,
    } else {
      // 0 didn't match 1 or 2, it must be the odd one
      desiredWeight = unbalanced[0].dependents[1].totalWeight;
    }
  }

  var wrongWeight = unbalanced[0].dependents.find(function (dep) {
    return dep.totalWeight !== desiredWeight;
  });
  return wrongWeight.weight + desiredWeight - wrongWeight.totalWeight;
};

var _default = solution;
exports.default = _default;