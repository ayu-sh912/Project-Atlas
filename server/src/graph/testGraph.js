const loadGraph = require('./graphLoader');

const graph = loadGraph();

console.log('Total nodes:', graph.getAllNodes().length);

console.log(
  'Main Gate:',
  graph.getNode('main-gate')
);

console.log(
  'Main Gate neighbors:',
  graph.getNeighbors('main-gate')
);