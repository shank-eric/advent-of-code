export { default as tests } from './tests';
export { default as solution } from './solution';
import { loadDayStringAsArray } from '../helpers';
export const loadData = (day) => {
  const arr = loadDayStringAsArray(day, ',');
  // arr[1] = 12;
  // arr[2] = 2;
  return arr.map(val => parseInt(val));
}

//779478 was too low