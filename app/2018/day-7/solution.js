import cTable from 'console.table';

function findUnassignedSteps(steps, prop){
  return Object.entries(steps).filter(([ letter, step ]) => {
    return !step.assigned && (step.prereqs.length === 0 || step.prereqs.every(l => steps[l].assigned));
  }).map(([ letter, step ]) => step).sort((a, b) => a.charCode - b.charCode);
}

function findStepOrder(steps){
  let stepOrder = '';
  let availableSteps = findUnassignedSteps(steps);
  while(availableSteps.length > 0){
    stepOrder += availableSteps[0].letter;
    availableSteps[0].assigned = true;
    availableSteps = findUnassignedSteps(steps);
  }
  return stepOrder;
}

function buildStepMapping(arrayInput, stepTime){
  const steps = {};
  arrayInput.forEach(step => {
    const [ _step, prereq, _must, _be, _fin, _bef, _step2, letter ] = step.split(' ');
    if (!steps[letter]){
      steps[letter] = {
        letter,
        charCode: letter.charCodeAt(0),
        time: letter.charCodeAt(0) - 64 + stepTime,
        prereqs: [ prereq ]
      }
    } else {
      steps[letter].prereqs.push(prereq);
    }
    if (!steps[prereq]){
      steps[prereq] = {
        letter: prereq,
        charCode: prereq.charCodeAt(0),
        time: prereq.charCodeAt(0) - 64 + stepTime,
        prereqs: [ ]
      }
    }
  });
  return steps;
}

const solution_1 = function(input){
  let arrayInput = Array.from(input);
  const steps = buildStepMapping(arrayInput);
  return findStepOrder(steps);
}

function findAvailableSteps(steps, prop){
  return Object.entries(steps).filter(([ letter, step ]) => {
    return !step.completed && !step.worker && (step.prereqs.length === 0 || step.prereqs.every(l => steps[l].completed));
  }).map(([ letter, step ]) => step).sort((a, b) => a.charCode - b.charCode);
}

const solution = function(input){
  let arrayInput = Array.from(input);
  let workerCount, stepTime;
  if (arrayInput.length > 10){
    workerCount = 5;
    stepTime = 60;
  } else {
    workerCount = 2;
    stepTime = 0;
  }
  const steps = buildStepMapping(arrayInput, stepTime);
  const stepOrder = findStepOrder(steps);

  const workers = [];
  for(let i = 0; i < workerCount; i++){
    workers.push({ id: i + 1, activity: [] });
  }
  let time = 0;
  let lastStep = steps[stepOrder[stepOrder.length - 1]];
  console.log(stepOrder);
  while (!lastStep.completed){
    workers.forEach(worker => {
      if (worker.currentStep){
        if (time === worker.currentStep.finishTime){
          worker.currentStep.completed = true;
          worker.currentStep = null;
        }
      }
    });

    const availableSteps = findAvailableSteps(steps);
    // if (availableSteps.length > 0) {
    //   console.log(availableSteps);
    // }
    workers.forEach(worker => {
      if (!worker.currentStep && availableSteps.length > 0){
        worker.currentStep = availableSteps.shift();
        worker.currentStep.worker = worker;
        worker.currentStep.startTime = time;
        worker.currentStep.finishTime = time + worker.currentStep.time;
      }
      worker.activity.push(worker.currentStep ? worker.currentStep.letter : '.')
    });
    if (!lastStep.completed) {
      time++;
    }
  }
  console.log(steps);
  console.table(workers);
  return time;
}

//JNOIKSYABEQRUVWXGTZFDMHLPC

export default solution;
