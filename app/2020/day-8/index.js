export { default as tests } from './tests';
export { default as solution } from './solution';
import { loadDayString } from '../helpers';
export const loadData = (day) => {
  const data = loadDayString(day, ',');
  return {
    data,
    height: 6,
    width: 25
  }
}
