import util from 'util';

const solution_1 = function(inputs){
  let tree = {};
  inputs.forEach((input) => {
    let [ source, right ] = input.split(' <-> ');
    let related = right.split(', ');
    if (!tree[source]){
      tree[source] = { related: new Set() };
    }
    related.forEach((val) => {
      tree[source].related.add(val);
      if (!tree[related]){
        tree[related] = { related: new Set() }
      }
      tree[related].related.add(source);
    });
  });

  let relatedToZero = new Set();
  function countRelateds(program){
    program.related.forEach((value) => {
      if (!relatedToZero.has(value)) {
        relatedToZero.add(value);
        countRelateds(tree[value]);
      }
    })
  }

  countRelateds(tree['0']);
  return relatedToZero.size;
}

const solution = function(inputs){
  let tree = {};
  inputs.forEach((input) => {
    let [ source, right ] = input.split(' <-> ');
    let related = right.split(', ');
    // console.log(related);
    if (!tree[source]){
      tree[source] = { related: new Set() };
    }
    related.forEach((val) => {
      tree[source].related.add(val);
      if (!tree[val]){
        tree[val] = { related: new Set() }
      }
      tree[val].related.add(source);
    });
  });

  let sets = [];
  // console.log(util.inspect(tree, { depth: 5 }))
  Object.entries(tree).forEach(([ key, value ]) => {
    // console.log(sets, key);
    // let someSetHasKey = sets.some((set) => set.has(key));
    // sets.forEach((set) => {
    //   if (set.has(key)){
    //     console.log(set, ' has ', key, someSetHasKey);
    //   }
    // });
    if (!sets.some((set) => set.has(key))){
      let relatedToCurrent = new Set();
      function countRelateds(program){
        program.related.forEach((value) => {
          if (!relatedToCurrent.has(value)) {
            relatedToCurrent.add(value);
            countRelateds(tree[value]);
          }
        })
      }
      countRelateds(value);
      sets.push(relatedToCurrent);
    }
  });
  // console.log(sets);
  return sets.length;
}

export default solution;