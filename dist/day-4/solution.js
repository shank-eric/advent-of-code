"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _console = _interopRequireDefault(require("console.table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sortData(arrayInput) {
  var formatted = arrayInput.map(function (row) {
    var data = {
      date: new Date(row.substring(0, 18).replace('[', '').replace(']', ''))
    };

    if (row.includes('#')) {
      data.id = row.substring(row.indexOf('#'), row.indexOf(' ', row.indexOf('#')));
      data.action = row.substring(row.indexOf(data.id), row.length).replace("".concat(data.id, " "), '');
    } else {
      data.action = row.substring(19, row.length);
    }

    return data;
  });
  formatted.sort(function (a, b) {
    return a.date - b.date;
  });
  var guardId;
  formatted.forEach(function (event) {
    if (event.action === 'begins shift') {
      guardId = event.id;
    } else {
      event.id = guardId;
    }
  });
  return formatted;
}

function findSleepTimes(sleepData) {
  var guards = {};
  var sleepStart;
  sleepData.forEach(function (_ref) {
    var action = _ref.action,
        id = _ref.id,
        date = _ref.date;

    if (action === 'falls asleep') {
      if (!guards[id]) {
        guards[id] = {
          sleepEvents: [],
          id: parseInt(id.replace('#', ''))
        };
      }

      sleepStart = date;
    } else if (action === 'wakes up') {
      guards[id].sleepEvents.push({
        start: sleepStart,
        end: date,
        startMinute: sleepStart.getMinutes(),
        endMinute: date.getMinutes()
      });
    }
  });
  Object.values(guards).forEach(function (guard) {
    guard.totalSleeping = guard.sleepEvents.reduce(function (agg, event) {
      return agg += event.endMinute - event.startMinute;
    }, 0);
    guard.sleepMinutes = [];

    var _loop = function _loop(i) {
      var sleepTimes = guard.sleepEvents.reduce(function (agg, event) {
        return agg += event.startMinute <= i && i < event.endMinute ? 1 : 0;
      }, 0);
      guard.sleepMinutes.push({
        minute: i,
        sleepTimes: sleepTimes
      });
    };

    for (var i = 0; i < 60; i++) {
      _loop(i);
    }
  });
  return guards;
}

var solution_1 = function solution_1(input) {
  var arrayInput = Array.from(input);
  var sortedData = sortData(arrayInput);
  var guards = findSleepTimes(sortedData); // console.log(guards);

  var selectedGuard;
  Object.entries(guards).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        guard = _ref3[1];

    if (!selectedGuard) {
      selectedGuard = guard;
    }

    if (guard.totalSleeping > selectedGuard.totalSleeping) {
      selectedGuard = guard;
    }
  });
  var selectedMinute = selectedGuard.sleepMinutes[0];
  selectedGuard.sleepMinutes.forEach(function (sleepMinute) {
    if (sleepMinute.sleepTimes > selectedMinute.sleepTimes) {
      selectedMinute = sleepMinute;
    }
  });
  console.log(selectedGuard, selectedMinute);
  return selectedGuard.id * selectedMinute.minute;
};

var solution = function solution(input) {
  var arrayInput = Array.from(input);
  var sortedData = sortData(arrayInput);
  var guards = findSleepTimes(sortedData); // console.log(guards);

  var selectedGuard, selectedMinute;
  Object.entries(guards).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        id = _ref5[0],
        guard = _ref5[1];

    if (!selectedGuard) {
      selectedGuard = guard;
    }

    guard.sleepMinutes.forEach(function (sleepMinute) {
      if (!selectedMinute) {
        selectedMinute = sleepMinute;
      }

      if (sleepMinute.sleepTimes > selectedMinute.sleepTimes) {
        selectedGuard = guard;
        selectedMinute = sleepMinute;
      }
    });
  });
  console.log(selectedGuard, selectedMinute);
  return selectedGuard.id * selectedMinute.minute;
};

var _default = solution;
exports.default = _default;