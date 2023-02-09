## BINARY TREE

### Node Class
```javascript
class Node {
  constructor(val) {
    this.val = val
    this.left = left
    this.right = right
  }
}
```

### DFS Iterative
```javascript
const dfsIterativve = (root) => {
  if (!root) return []

  const vals = []
  const stack = [ root ]

  while (stack.length > 0) {
    const node = stack.pop()
    vals.push(node.val)

    if (!!node.right) stack.push(node.right)
    if (!!node.left) stack.push(node.left)
  }

  return vals
}
```

### DFS Recursive
```javascript
const dfsRecursive = (root) => {
  if (!root) return []

  const leftVals = dfsRecursive(root.left)
  const rightVals = dfsRecursive(root.right)

  return [ root.val, ...leftVals, ...rightVals]
}
```

### BFS Iterative
```javascript
const bfsIterative = (root) => {
  if (!root) return []

  const vals = []
  const queue = [ root ]
  
  while (queue.length > 0) {
    const node = queue.shift()
    vals.push(node.val)

    if (!!node.right) queue.push(node.right)
    if (!!node.left) queue.push(node.left)
  }

  return vals
}

```


### 
```javascript
```
### 
```javascript
```