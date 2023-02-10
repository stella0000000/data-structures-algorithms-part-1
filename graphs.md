## GRAPHS

### DFS Iterative
```javascript
const dfsIterative = (graph, source) => {
  const stack = [ source ]

  while (stack.length > 0) {
    const node = stack.pop()

    console.log(node)

    for (let neighbor of graph[node]) {
      stack.push(neighbor)
    }
  }
}
```

### DFS Recursive
```javascript
const dfsRecursive = (graph, source) => {
  console.log(source)

  for (let neighbor of graph[source]) {
    dfsRecursive(graph, neighbor)
  }
}
```

### BFS Iterative (shortest path)
```javascript
const bfsIterative = (graph, source) => {
  const queue = [ source ]

  while (queue.length > 0) {
    const node = queue.shift()

    console.log(node)
    
    for (let neighbor of graph[node]) {
      queue.push(neighbor)
    }
  }
}
```

### Build  adjacency list with edges[]
```javascript
const buildGraph = (edges) => {
  const graph = {}

  for (let edge of edges) {
    let [a, b] = edge

    // * DIRECTED *
    if (!graph[a]) graph[a] = []
    graph[a].push(b)

    // * UNDIRECTED *
    // if (!graph[a]) graph[a] = []
    // if (!graph[b]) graph[b] = []
    // graph[a].push(b)
    // graph[b].push(a)
  }

  return graph
}
```

### 
```javascript
```

### 
```javascript
```

### 
```javascript
```