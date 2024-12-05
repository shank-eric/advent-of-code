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

//4559 is too low
var solution_1 = function solution_1(inputs) {
  var registers = {}; // inputs.forEach((input) => {

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i]; // let [ action, evalString ] = input.split(' if ');
    // let [ register, incDec, amount ] = action.split(' ');

    var _input$split = input.split(' '),
        _input$split2 = _slicedToArray(_input$split, 7),
        register = _input$split2[0],
        incDec = _input$split2[1],
        amount = _input$split2[2],
        _if = _input$split2[3],
        regCheck = _input$split2[4],
        check = _input$split2[5],
        valueCheck = _input$split2[6];

    if (registers[register] === undefined) {
      registers[register] = 0;
    }

    if (registers[regCheck] === undefined) {
      registers[regCheck] = 0;
    }

    amount = parseInt(amount);
    valueCheck = parseInt(valueCheck);
    check = check === '==' ? '===' : check;
    check = check === '!=' ? '!==' : check;
    var evalCheck = "".concat(registers[regCheck], " ").concat(check, " ").concat(valueCheck); // console.log(evalCheck);

    if (eval(evalCheck)) {
      var evalAction = "registers[register] = ".concat(registers[register], " ").concat(incDec === 'inc' ? '+' : '-', " ").concat(amount); // console.log(evalAction);

      eval(evalAction);
    } // console.log(util.inspect(registers));
    // if (i > 10){
    //   break;
    // }

  }

  ;
  return Math.max.apply(null, Object.values(registers));
};

var solution = function solution(inputs) {
  var registers = {};
  var max; // inputs.forEach((input) => {

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i]; // let [ action, evalString ] = input.split(' if ');
    // let [ register, incDec, amount ] = action.split(' ');

    var _input$split3 = input.split(' '),
        _input$split4 = _slicedToArray(_input$split3, 7),
        register = _input$split4[0],
        incDec = _input$split4[1],
        amount = _input$split4[2],
        _if = _input$split4[3],
        regCheck = _input$split4[4],
        check = _input$split4[5],
        valueCheck = _input$split4[6];

    if (registers[register] === undefined) {
      registers[register] = 0;
    }

    if (registers[regCheck] === undefined) {
      registers[regCheck] = 0;
    }

    amount = parseInt(amount);
    valueCheck = parseInt(valueCheck);
    check = check === '==' ? '===' : check;
    check = check === '!=' ? '!==' : check;
    var evalCheck = "".concat(registers[regCheck], " ").concat(check, " ").concat(valueCheck); // console.log(evalCheck);

    if (eval(evalCheck)) {
      var evalAction = "registers[register] = ".concat(registers[register], " ").concat(incDec === 'inc' ? '+' : '-', " ").concat(amount); // console.log(evalAction);

      eval(evalAction);
    } // console.log(util.inspect(registers));
    // if (i > 10){
    //   break;
    // }


    var currMax = Math.max.apply(null, Object.values(registers));

    if (max === undefined || max < currMax) {
      max = currMax;
    }
  }

  ;
  return max;
};

var _default = solution;
exports.default = _default;