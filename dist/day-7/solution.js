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

function findUnassignedSteps(steps, prop) {
  return Object.entries(steps).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        letter = _ref2[0],
        step = _ref2[1];

    return !step.assigned && (step.prereqs.length === 0 || step.prereqs.every(function (l) {
      return steps[l].assigned;
    }));
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        letter = _ref4[0],
        step = _ref4[1];

    return step;
  }).sort(function (a, b) {
    return a.charCode - b.charCode;
  });
}

function findStepOrder(steps) {
  var stepOrder = '';
  var availableSteps = findUnassignedSteps(steps);

  while (availableSteps.length > 0) {
    stepOrder += availableSteps[0].letter;
    availableSteps[0].assigned = true;
    availableSteps = findUnassignedSteps(steps);
  }

  return stepOrder;
}

function buildStepMapping(arrayInput, stepTime) {
  var steps = {};
  arrayInput.forEach(function (step) {
    var _step$split = step.split(' '),
        _step$split2 = _slicedToArray(_step$split, 8),
        _step = _step$split2[0],
        prereq = _step$split2[1],
        _must = _step$split2[2],
        _be = _step$split2[3],
        _fin = _step$split2[4],
        _bef = _step$split2[5],
        _step2 = _step$split2[6],
        letter = _step$split2[7];

    if (!steps[letter]) {
      steps[letter] = {
        letter: letter,
        charCode: letter.charCodeAt(0),
        time: letter.charCodeAt(0) - 64 + stepTime,
        prereqs: [prereq]
      };
    } else {
      steps[letter].prereqs.push(prereq);
    }

    if (!steps[prereq]) {
      steps[prereq] = {
        letter: prereq,
        charCode: prereq.charCodeAt(0),
        time: prereq.charCodeAt(0) - 64 + stepTime,
        prereqs: []
      };
    }
  });
  return steps;
}

var solution_1 = function solution_1(input) {
  var arrayInput = Array.from(input);
  var steps = buildStepMapping(arrayInput);
  return findStepOrder(steps);
};

function findAvailableSteps(steps, prop) {
  return Object.entries(steps).filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        letter = _ref6[0],
        step = _ref6[1];

    return !step.completed && !step.worker && (step.prereqs.length === 0 || step.prereqs.every(function (l) {
      return steps[l].completed;
    }));
  }).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        letter = _ref8[0],
        step = _ref8[1];

    return step;
  }).sort(function (a, b) {
    return a.charCode - b.charCode;
  });
}

var solution = function solution(input) {
  var arrayInput = Array.from(input);
  var workerCount, stepTime;

  if (arrayInput.length > 10) {
    workerCount = 5;
    stepTime = 60;
  } else {
    workerCount = 2;
    stepTime = 0;
  }

  var steps = buildStepMapping(arrayInput, stepTime);
  var stepOrder = findStepOrder(steps);
  var workers = [];

  for (var i = 0; i < workerCount; i++) {
    workers.push({
      id: i + 1,
      activity: []
    });
  }

  var time = 0;
  var lastStep = steps[stepOrder[stepOrder.length - 1]];
  console.log(stepOrder);

  var _loop = function _loop() {
    workers.forEach(function (worker) {
      if (worker.currentStep) {
        if (time === worker.currentStep.finishTime) {
          worker.currentStep.completed = true;
          worker.currentStep = null;
        }
      }
    });
    var availableSteps = findAvailableSteps(steps); // if (availableSteps.length > 0) {
    //   console.log(availableSteps);
    // }

    workers.forEach(function (worker) {
      if (!worker.currentStep && availableSteps.length > 0) {
        worker.currentStep = availableSteps.shift();
        worker.currentStep.worker = worker;
        worker.currentStep.startTime = time;
        worker.currentStep.finishTime = time + worker.currentStep.time;
      }

      worker.activity.push(worker.currentStep ? worker.currentStep.letter : '.');
    });

    if (!lastStep.completed) {
      time++;
    }
  };

  while (!lastStep.completed) {
    _loop();
  }

  console.log(steps);
  console.table(workers);
  return time;
}; //JNOIKSYABEQRUVWXGTZFDMHLPC


var _default = solution;
exports.default = _default;