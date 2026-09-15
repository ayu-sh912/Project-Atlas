const fs = require('fs');
const path = require('path');

const Graph = require('./Graph');

const nodesPath = path.join(
  __dirname,
  '../../../campus-data/nodes.json'
);

const edgesPath = path.join(
  __dirname,
  '../../../campus-data/edges.json'
);

const loadGraph = () => {
  const nodes = JSON.parse(
    fs.readFileSync(nodesPath, 'utf-8')
  );

  const edges = JSON.parse(
    fs.readFileSync(edgesPath, 'utf-8')
  );

  const graph = new Graph();

  // Add all nodes
  nodes.forEach((node) => {
    graph.addNode(node);
  });

  // Add all edges
  edges.forEach((edge) => {
    graph.addEdge(
      edge.from,
      edge.to,
      edge.weight
    );
  });

  return graph;
};

module.exports = loadGraph;