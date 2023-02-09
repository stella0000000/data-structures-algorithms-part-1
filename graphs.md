## GRAPHS

### DFS Iterative
```javascript
const dfsIterative = (graph, source) => {
  const stack = [ source ]

  while (stack.length > 0) {
    const curr = stack.pop()

    console.log(curr)

    for (let neighbor of graph[curr]) {
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

### BFS Iterative
```javascript
const bfsIterative = (graph, source) => {
  const queue = [ source ]

  while (queue.length > 0) {
    const curr = queue.shift()

    console.log(curr)
    
    for (let neighbor of graph[curr]) {
      queue.push(neighbor)
    }
  }
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

### 
```javascript
```