export { default as tests } from './tests.js';
export { default as solution } from './solution.js';
import { loadDayArray, loadDataWithParams } from '../../helpers/index.js';
export const loadData = (day) =>
  loadDataWithParams(day, loadDayArray, {
    maxCubes: {
      red: 12,
      green: 13,
      blue: 14,
    },
  });

// wrong answers
// 2079 too low
