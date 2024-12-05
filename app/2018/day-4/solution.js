import cTable from 'console.table';

function sortData(arrayInput){
  const formatted = arrayInput.map(row => {
    const data = {
      date: new Date(row.substring(0, 18).replace('[', '').replace(']', ''))
    };
    if (row.includes('#')){
      data.id = row.substring(row.indexOf('#'), row.indexOf(' ', row.indexOf('#')));
      data.action = row.substring(row.indexOf(data.id), row.length).replace(`${data.id} `, '');
    } else {
      data.action = row.substring(19, row.length);
    }
    return data;
  });
  formatted.sort((a, b) => {
    return a.date - b.date;
  });
  let guardId;
  formatted.forEach(event => {
    if (event.action === 'begins shift'){
      guardId = event.id
    } else {
      event.id = guardId;
    }
  });
  return formatted;
}

function findSleepTimes(sleepData){
  const guards = {};
  let sleepStart;
  sleepData.forEach(({ action, id, date }) => {
    if (action === 'falls asleep'){
      if (!guards[id]){
        guards[id] = { sleepEvents: [], id: parseInt(id.replace('#', '')) };
      }
      sleepStart = date;
    } else if (action === 'wakes up'){
      guards[id].sleepEvents.push({
        start: sleepStart,
        end: date,
        startMinute: sleepStart.getMinutes(),
        endMinute: date.getMinutes() })
    }
  });
  Object.values(guards).forEach(guard => {
    guard.totalSleeping = guard.sleepEvents.reduce((agg, event) => agg += event.endMinute - event.startMinute, 0);
    guard.sleepMinutes = [];
    for(let i = 0; i < 60; i++){
      const sleepTimes = guard.sleepEvents.reduce((agg, event) => agg += (event.startMinute <= i && i < event.endMinute ? 1 : 0), 0)
      guard.sleepMinutes.push({ minute: i, sleepTimes })
    }
  })
  return guards;
}

const solution_1 = function(input) {
  let arrayInput = Array.from(input);
  const sortedData = sortData(arrayInput);
  const guards = findSleepTimes(sortedData);
  // console.log(guards);
  let selectedGuard;
  Object.entries(guards).forEach(([ id, guard ]) => {
    if (!selectedGuard){
      selectedGuard = guard;
    }
    if (guard.totalSleeping > selectedGuard.totalSleeping){
      selectedGuard = guard;
    }
  });
  let selectedMinute = selectedGuard.sleepMinutes[0];
  selectedGuard.sleepMinutes.forEach(sleepMinute => {
    if(sleepMinute.sleepTimes > selectedMinute.sleepTimes){
      selectedMinute = sleepMinute;
    }
  })
  console.log(selectedGuard, selectedMinute);
  return selectedGuard.id * selectedMinute.minute;
}

const solution = function(input) {
  let arrayInput = Array.from(input);
  const sortedData = sortData(arrayInput);
  const guards = findSleepTimes(sortedData);
  // console.log(guards);
  let selectedGuard, selectedMinute;
  Object.entries(guards).forEach(([ id, guard ]) => {
    if (!selectedGuard){
      selectedGuard = guard;
    }
    guard.sleepMinutes.forEach(sleepMinute => {
      if (!selectedMinute){
        selectedMinute = sleepMinute;
      }
      if(sleepMinute.sleepTimes > selectedMinute.sleepTimes){
        selectedGuard = guard;
        selectedMinute = sleepMinute;
      }
    })
  });
  console.log(selectedGuard, selectedMinute);
  return selectedGuard.id * selectedMinute.minute;
}



export default solution;
