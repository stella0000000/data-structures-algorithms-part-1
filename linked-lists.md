## SINGLYLINKED LIST

### Node Class
```javascript
class Node {
  constructor(val) {
    this.val = val
    this.next =  null
  }
}
```

### 
```javascript
const printValsIterative = (head) => {
  let curr = head

  while (curr !== null) {
    console.log(curr)
    curr = curr.next
  }
}
```

### 
```javascript
const printValsRecursive = (head) => {
  // base case => i.e. "when are we done?"
  if (head === null) return
  
  console.log(head)
  printRecursive(head.next)
}
```

## DOUBLY LINKED LIST

### Node Class
```javascript
class Node {
  constructor(val, prev, val) {
    this.val = val
    this.prev = null
    this.next =  null
  }
}
```

### 
```javascript
```

### 
```javascript
```