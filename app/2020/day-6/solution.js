const solution_1 = function(input){
  const solarMap = {};
  input.forEach(orbit => {
    const [ orbitee, orbiter ] = orbit.split(')');
    if (!solarMap[orbitee]) {
      solarMap[orbitee] = { id: orbitee, orbiters: [] };
    }
    if (!solarMap[orbiter]) {
      solarMap[orbiter] = { id: orbiter, orbiters: [] };
    }
    solarMap[orbiter].orbitee = solarMap[orbitee]
    solarMap[orbitee].orbiters.push(orbiter);
  })
  console.log(solarMap);
  let orbits = 0;
  Object.entries(solarMap).forEach(([ key, value ]) => {
    let orbitee = value.orbitee
    while (orbitee){
      orbits++;
      orbitee = orbitee.orbitee;
    }
  });
  return orbits;
}

const solution = function(input){
  const solarMap = {};
  input.forEach(orbit => {
    const [ orbitee, orbiter ] = orbit.split(')');
    if (!solarMap[orbitee]) {
      solarMap[orbitee] = { id: orbitee, orbiters: [] };
    }
    if (!solarMap[orbiter]) {
      solarMap[orbiter] = { id: orbiter, orbiters: [] };
    }
    solarMap[orbiter].orbitee = solarMap[orbitee]
    solarMap[orbitee].orbiters.push(orbiter);
  })
  // console.log(solarMap);
  let santaPathToCOM = [];
  let currOrbit = solarMap.SAN.orbitee
  while (currOrbit !== solarMap.COM){
    santaPathToCOM.push(currOrbit.id);
    currOrbit = currOrbit.orbitee;
  }

  let myPathToCOM = []
  currOrbit = solarMap.YOU.orbitee
  while (currOrbit !== solarMap.COM){
    myPathToCOM.push(currOrbit.id);
    currOrbit = currOrbit.orbitee;
  }
  myPathToCOM = myPathToCOM.reverse();
  santaPathToCOM = santaPathToCOM.reverse();
  let i = 0;
  while (myPathToCOM[i] === santaPathToCOM[i]){
    i++;
  }
  // console.log(santaPathToCOM);
  // console.log(myPathToCOM);
  return (myPathToCOM.length - i) + (santaPathToCOM.length - i);
}


export default solution;


