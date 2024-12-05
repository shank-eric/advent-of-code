import fs from 'fs';
import util from 'util';

function readFile(day, ext = 'txt') {
  var file = fs.readFileSync(`./app/day-${day}/input.${ext}`);
  return file.toString('utf8');
}

export const loadDataWithParams = (day, loadFn, params) => {
  return { data: loadFn(day), ...params };
};

export const loadDayStringAsArray = function (day, delimiter = ' ') {
  return loadDayString(day).split(delimiter);
};

export const loadDayString = function (day) {
  return readFile(day);
};

export const loadDayJson = function (day) {
  let data = readFile(day, 'json');
  return JSON.parse(data);
};

export const loadDayArray = function (day) {
  let data = readFile(day);
  return data.split('\n').filter((v) => !!v);
};

export const loadDayTable = function (day) {
  let data = readFile(day);
  let rows = data.split('\n');
  return rows.map((row) => row.split('\t'));
};

//print helpers
export const overwrite = function (text) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(text);
};

export const logJson = (json) => {
  console.log(util.inspect(json, false, null, true /* enable colors */));
};

export const permutate = function (src, minLen, maxLen) {
  minLen = minLen - 1 || 0;
  maxLen = maxLen || src.length + 1;
  var Asource = src.slice(); // copy the original so we don't apply results to the original.

  var Aout = [];

  var minMax = function (arr) {
    var len = arr.length;
    if (len > minLen && len <= maxLen) {
      Aout.push(arr);
    }
  };

  var picker = function (arr, holder, collect) {
    if (holder.length) {
      collect.push(holder);
    }
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      var arrcopy = arr.slice();
      var elem = arrcopy.splice(i, 1);
      var result = holder.concat(elem);
      minMax(result);
      if (len) {
        picker(arrcopy, result, collect);
      } else {
        collect.push(result);
      }
    }
  };

  picker(Asource, [], []);

  return Aout;
};
