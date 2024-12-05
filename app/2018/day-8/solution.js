import cTable from 'console.table';
import util from 'util';

const solution_1 = function(arrayInput){
  let index = 0;
  const parseNode = function(nodes){
    // console.log(`starting parseNode at ${index}`);
    const node = {
      childNodeCount: parseInt(nodes[index]),
      metadataNodeCount: parseInt(nodes[index + 1]),
      childNodes: [],
      metadata: [],
      childMetadataSum: 0,
      selfMetadataSum: 0
    };
    index += 2;
    for(let i = 0; i < node.childNodeCount; i++){
      const newNode = parseNode(nodes);
      node.childMetadataSum += newNode.totalMetadata;
      node.childNodes.push(newNode);
    }
    for(let i = 0; i < node.metadataNodeCount; i++){
      node.metadata.push(parseInt(nodes[index]));
      node.selfMetadataSum += parseInt(nodes[index]);
      index++;
    }
    node.totalMetadata = node.selfMetadataSum + node.childMetadataSum
    return node;
  }
  const licenseTree = parseNode(arrayInput);
  console.log(util.inspect(licenseTree, { depth: 5 }));
  return licenseTree.totalMetadata;
}

const solution = function(arrayInput){
  let index = 0;
  const parseNode = function(nodes){
    // console.log(`starting parseNode at ${index}`);
    const node = {
      childNodeCount: parseInt(nodes[index]),
      metadataNodeCount: parseInt(nodes[index + 1]),
      childNodes: [],
      metadata: [],
      childMetadataSum: 0,
      selfMetadataSum: 0
    };
    index += 2;
    for(let i = 0; i < node.childNodeCount; i++){
      const newNode = parseNode(nodes);
      node.childNodes.push(newNode);
    }
    for(let i = 0; i < node.metadataNodeCount; i++){
      const metadataValue = parseInt(nodes[index]);
      node.metadata.push(metadataValue);
      if (node.childNodeCount === 0) {
        node.selfMetadataSum += metadataValue;
      } else {
        if (node.childNodes[metadataValue - 1]){
          // console.log(`adding index ${metadataValue} of `, node.childNodes[metadataValue], node);
          node.selfMetadataSum += node.childNodes[metadataValue - 1].totalMetadata;
        } else {
          console.log(node, metadataValue);
        }
      }
      index++;
    }
    node.totalMetadata = node.selfMetadataSum + node.childMetadataSum
    return node;
  }
  const licenseTree = parseNode(arrayInput);
  console.log(util.inspect(licenseTree, { depth: 5 }));
  return licenseTree.totalMetadata;
}

export default solution;
