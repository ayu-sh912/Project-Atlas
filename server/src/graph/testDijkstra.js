const dijkstra = require('./dijkstra');

try {
  const result = dijkstra('main-gate', 'ab3');

  console.log('Dijkstra Result:');
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Dijkstra failed:', error.message);
}