export { default as tests } from './tests';
export { default as solution } from './solution';
import { loadDayStringAsArray } from '../helpers';
export const loadData = (day) => {
  const arr = loadDayStringAsArray(day, ',');
  return arr.map(val => parseInt(val));
}

