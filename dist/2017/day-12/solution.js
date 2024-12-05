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

var solution_1 = function solution_1(inputs) {
  var tree = {};
  inputs.forEach(function (input) {
    var _input$split = input.split(' <-> '),
        _input$split2 = _slicedToArray(_input$split, 2),
        source = _input$split2[0],
        right = _input$split2[1];

    var related = right.split(', ');

    if (!tree[source]) {
      tree[source] = {
        related: new Set()
      };
    }

    related.forEach(function (val) {
      tree[source].related.add(val);

      if (!tree[related]) {
        tree[related] = {
          related: new Set()
        };
      }

      tree[related].related.add(source);
    });
  });
  var relatedToZero = new Set();

  function countRelateds(program) {
    program.related.forEach(function (value) {
      if (!relatedToZero.has(value)) {
        relatedToZero.add(value);
        countRelateds(tree[value]);
      }
    });
  }

  countRelateds(tree['0']);
  return relatedToZero.size;
};

var solution = function solution(inputs) {
  var tree = {};
  inputs.forEach(function (input) {
    var _input$split3 = input.split(' <-> '),
        _input$split4 = _slicedToArray(_input$split3, 2),
        source = _input$split4[0],
        right = _input$split4[1];

    var related = right.split(', '); // console.log(related);

    if (!tree[source]) {
      tree[source] = {
        related: new Set()
      };
    }

    related.forEach(function (val) {
      tree[source].related.add(val);

      if (!tree[val]) {
        tree[val] = {
          related: new Set()
        };
      }

      tree[val].related.add(source);
    });
  });
  var sets = []; // console.log(util.inspect(tree, { depth: 5 }))

  Object.entries(tree).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    // console.log(sets, key);
    // let someSetHasKey = sets.some((set) => set.has(key));
    // sets.forEach((set) => {
    //   if (set.has(key)){
    //     console.log(set, ' has ', key, someSetHasKey);
    //   }
    // });
    if (!sets.some(function (set) {
      return set.has(key);
    })) {
      var countRelateds = function countRelateds(program) {
        program.related.forEach(function (value) {
          if (!relatedToCurrent.has(value)) {
            relatedToCurrent.add(value);
            countRelateds(tree[value]);
          }
        });
      };

      var relatedToCurrent = new Set();
      countRelateds(value);
      sets.push(relatedToCurrent);
    }
  }); // console.log(sets);

  return sets.length;
};

var _default = solution;
exports.default = _default;