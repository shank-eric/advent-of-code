"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var solution_1 = function solution_1(input) {
  var count = 0;
  input.forEach(function (pass) {
    var words = pass.split(' ');
    var uniqueWords = Array.from(new Set(words));

    if (words.length === uniqueWords.length) {
      count++;
    }
  });
  return count;
};

var solution = function solution(input) {
  var count = 0;
  input.forEach(function (pass) {
    var words = pass.split(' ');
    var match = false;
    var wordPropsArray = words.map(function (word) {
      var wordArray = Array.from(word);
      var wordProps = {};
      wordArray.forEach(function (letter) {
        if (wordProps[letter]) {
          wordProps[letter]++;
        } else {
          wordProps[letter] = 1;
        }
      });
      return wordProps;
    });

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var wordArray = Array.from(word);

      for (var w = i + 1; w < words.length; w++) {
        var nextWord = words[w];

        if (nextWord.length !== word.length) {
          continue;
        } else {
          var _ret = function () {
            var wordProps = wordPropsArray[i];
            var nextWordProps = wordPropsArray[w];
            match = Object.entries(wordProps).every(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return nextWordProps[key] && nextWordProps[key] === value;
            });

            if (match) {
              console.log("".concat(word, " matched ").concat(nextWord));
              return "break";
            }
          }();

          if (_ret === "break") break;
        }
      }

      if (match) {
        break;
      }
    }

    if (!match) {
      console.log("".concat(pass, " is valid!"));
      count++;
    }
  });
  return count;
};

var _default = solution;
exports.default = _default;