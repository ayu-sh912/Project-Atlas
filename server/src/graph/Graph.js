class Graph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(node) {
    this.nodes.set(node.id, node);
    this.edges.set(node.id, []);
  }

  addEdge(from, to, weight) {
    if (!this.nodes.has(from) || !this.nodes.has(to)) {
      throw new Error(`Invalid edge: ${from} -> ${to}`);
    }

    this.edges.get(from).push({
      node: to,
      weight,
    });
  }

  getNode(nodeId) {
    return this.nodes.get(nodeId);
  }

  getNeighbors(nodeId) {
    return this.edges.get(nodeId) || [];
  }

  getAllNodes() {
    return Array.from(this.nodes.values());
  }

  getAllEdges() {
    return this.edges;
  }
}

module.exports = Graph;