import util from 'util';

function buildTower(input){
  let tower = {};
  input.forEach((data) => {
    let [programWithWeight, dependentsData] = data.split(' -> ');
    let [program, weight] = programWithWeight.split(' (');
    weight = parseInt(weight.replace(')', ''));

    tower[program] = {
      weight,
      dependents: []
    };
    if (dependentsData) {
      tower[program].dependentsData = dependentsData.split(', ');
    }
  });

  while(Object.keys(tower).length > 1){
    Object.entries(tower).forEach(([key, value]) => {
      if (value.dependentsData){
        value.dependentsData.forEach((dep) => {
          value.dependents.push(tower[dep]);
          delete tower[dep];
        });
      }
    });
  }
  return tower;
}

const solution_1 = function(input){
  let tower = buildTower(input);
  return Object.keys(tower)[0];
}

const solution = function(input){
  let tower = buildTower(input);

  let unbalanced = [];
  function calcWeight(program){
    let dependentsWeight = 0;
    if(program.dependents.length > 0){
      program.dependents.forEach((dep) => {
        dependentsWeight += calcWeight(dep);
      });
      if (dependentsWeight / program.dependents.length !== program.dependents[0].totalWeight){
        unbalanced.push(program);
      }
    }
    program.totalWeight = program.weight + dependentsWeight;
    return program.totalWeight;
  }

  let rootTower = tower[Object.keys(tower)[0]];
  calcWeight(rootTower);
  console.log(unbalanced);
  let desiredWeight = unbalanced[0].dependents[0].totalWeight;
  if (desiredWeight === unbalanced[0].dependents[1].totalWeight) {
    //do nothing, two weights match, must be desired weight
  } else {
    // weight of 0 and 1 didn't match, need to check 2
    if (desiredWeight === unbalanced[0].dependents[2].totalWeight) {
      //do nothing, 1 was the odd one,
    } else {
      // 0 didn't match 1 or 2, it must be the odd one
      desiredWeight = unbalanced[0].dependents[1].totalWeight;
    }
  }

  let wrongWeight = unbalanced[0].dependents.find((dep) => dep.totalWeight !== desiredWeight);
  return wrongWeight.weight + desiredWeight - wrongWeight.totalWeight;
}

export default solution;