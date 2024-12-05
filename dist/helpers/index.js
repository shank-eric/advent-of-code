"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDayTable = exports.loadDayArray = exports.loadDayJson = exports.loadDayString = void 0;

var fs = require('fs');

function readFile(day) {
  var ext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'txt';
  var file = fs.readFileSync("./app/day-".concat(day, "/input.").concat(ext));
  return file.toString('utf8');
}

var loadDayString = function loadDayString(day) {
  return readFile(day);
};

exports.loadDayString = loadDayString;

var loadDayJson = function loadDayJson(day) {
  var data = readFile(day, 'json');
  return JSON.parse(data);
};

exports.loadDayJson = loadDayJson;

var loadDayArray = function loadDayArray(day) {
  var data = readFile(day);
  return data.split("\n");
};

exports.loadDayArray = loadDayArray;

var loadDayTable = function loadDayTable(day) {
  var data = readFile(day);
  var rows = data.split("\n");
  return rows.map(function (row) {
    return row.split('\t');
  });
};

exports.loadDayTable = loadDayTable;