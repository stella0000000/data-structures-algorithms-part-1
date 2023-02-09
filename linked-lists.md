## LINKED LIST

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
const printIterative = (head) => {
  let curr = head

  while (curr !== null) {
    console.log(curr)
    curr = curr.next
  }
}
```

### 
```javascript
const printRecursive = (head) => {
  if (head === null) return
  
  console.log(head)
  printRecursive(head.next)
}
```

### 
```javascript
```

### 
```javascript
```