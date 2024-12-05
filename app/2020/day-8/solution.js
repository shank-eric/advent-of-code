const calcOnesAndTwos = function(layers){
  let leastZerosLayer;
  layers.forEach(layer => {
    layer.zeros = layer.reduce((zeros, row) => {
      for(let i = 0; i < row.length; i++){
        if (row[i] === '0'){
          zeros++;
        }
      }
      return zeros;
    }, 0)
    if (!leastZerosLayer){
      leastZerosLayer = layer;
    } else if (layer.zeros < leastZerosLayer.zeros){
      leastZerosLayer = layer;
    }
  })
  leastZerosLayer.ones = leastZerosLayer.reduce((ones, row) => {
    for(let i = 0; i < row.length; i++){
      if (row[i] === '1'){
        ones++;
      }
    }
    return ones;
  }, 0)
  leastZerosLayer.twos = leastZerosLayer.reduce((twos, row) => {
    for(let i = 0; i < row.length; i++){
      if (row[i] === '2'){
        twos++;
      }
    }
    return twos;
  }, 0)
  console.log(leastZerosLayer);
  return leastZerosLayer.ones * leastZerosLayer.twos;
}

const buildLayers = function(width, height, data){
  const layers = [];
  let i = 0;
  while (i < data.length){
    let layer = [];
    for (let h = 0; h < height; h++){
      let row = '';
      for(let w = 0; w < width; w++){
        row += data[i];
        i++;
      }
      layer.push(row);
    }
    layers.push(layer);
  }
  return layers;
}

const solution_1 = function({ width, height, data }){
  return calcOnesAndTwos(buildLayers(width, height, data));
}

const solution = function({ width, height, data }) {
  const layers = buildLayers(width, height, data);
  console.log(layers);
  let image = '\n';
  for (let h = 0; h < height; h++){
    for(let w = 0; w < width; w++){
      let i = 0;
      try {
        while (layers[i][h][w] === '2' && i < layers.length) {
          i++;
        }
        image += layers[i][h][w] === '0' ? '.' : '1';
      } catch (e){
        console.log(i, h, w);
        throw e;
      }
    }
    image += '\n';
  }
  console.log(image);
  return JSON.stringify(image);
}

export default solution;


