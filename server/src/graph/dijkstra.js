const loadGraph = require('./graphLoader');

const dijkstra = (startNodeId, endNodeId) => {
  const graph = loadGraph();

  // Check start node
  if (!graph.getNode(startNodeId)) {
    throw new Error(`Start node not found: ${startNodeId}`);
  }

  // Check destination node
  if (!graph.getNode(endNodeId)) {
    throw new Error(`End node not found: ${endNodeId}`);
  }

  const distances = new Map();
  const previous = new Map();
  const unvisited = new Set();

  // Initialize
  graph.getAllNodes().forEach((node) => {
    distances.set(node.id, Infinity);
    previous.set(node.id, null);
    unvisited.add(node.id);
  });

  distances.set(startNodeId, 0);

  while (unvisited.size > 0) {
    let currentNodeId = null;
    let smallestDistance = Infinity;

    // Find unvisited node with smallest distance
    for (const nodeId of unvisited) {
      const distance = distances.get(nodeId);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentNodeId = nodeId;
      }
    }

    // No reachable nodes remain
    if (currentNodeId === null) {
      break;
    }

    // Destination reached
    if (currentNodeId === endNodeId) {
      break;
    }

    unvisited.delete(currentNodeId);

    const neighbors = graph.getNeighbors(currentNodeId);

    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.node)) {
        continue;
      }

      const newDistance =
        distances.get(currentNodeId) + neighbor.weight;

      if (newDistance < distances.get(neighbor.node)) {
        distances.set(neighbor.node, newDistance);
        previous.set(neighbor.node, currentNodeId);
      }
    }
  }

  // Destination is unreachable
  if (distances.get(endNodeId) === Infinity) {
    return {
      found: false,
      distance: null,
      path: [],
    };
  }

  // Reconstruct path
  const path = [];
  let currentNodeId = endNodeId;

  while (currentNodeId !== null) {
    path.unshift(graph.getNode(currentNodeId));
    currentNodeId = previous.get(currentNodeId);
  }

  return {
    found: true,
    distance: distances.get(endNodeId),
    path,
  };
};

module.exports = dijkstra;