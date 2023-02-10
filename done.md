### 1029 Two City Scheduling
```javascript
const twoCitySchedCost = (costs) => {
  // 2n people
  // costs[] => cost[i] = [aCost_i, bCost_i]
  // aCost = cost of flying ith person to city a
  // bCost = cost of flying ith person to city b
  // return min cost to fly everyone to a city
  // => n people arrive in each city

  const sorted = costs.sort((a, b) => (a[0]-a[1]) - (b[0]-b[1]))
  // sorting by (costA - costB) => send first half to A
  // sorted will result in 0 deviation to center
  // if A > B, ++ (end of the arr), so send first half to A

  const mid = costs.length / 2
  let sum = 0

  for (let i=0; i<sorted.length; i++) {
      if (i < mid) {
          sum += sorted[i][0]
      } else {
          sum += sorted[i][1]
      }
  }

  return sum
}
```

### 380 Insert Delete GetRandom O(1)
```javascript
class RandomizedSet() {
  constructor() {
    // key is arr[idx]: val is idx
    this.map = new Map()
    this.arr = new Array()
  }

  insert(val) {
    if (this.map.has(val)) return false

    this.arr.push(val)
    this.map.set(val, this.arr.length-1)
    return true
  }

  remove(val) {
    if (!this.map.has(val)) return false

    // idx @ this val
    let idx = this.map.get(val);
    // swap arr[idx] with arr[lastIdx]
    [this.arr[idx], this.arr[this.arr.length-1]] = [this.arr[this.arr.length-1], this.arr[idx]]
    // update map from arr swap
    this.map(this.arr[idx], idx)

    // now val is @ end of arr => pop
    this.arr.pop()
    // delete entry @ val
    this.map.delete(val)

    return true
  }

  getRandom() {
    const random = Math.floor(Math.random()*arr.length)
    return this.arr[random]
  }
}
```

### 1396 Design Underground System
```javascript
class UndergroundSystem {
    constructor() {
        this.customer = {}
        // [id] = startStation, startTime
        this.avgs = {}
        // running avgs
        // startStation-endStation: [ totalTime, numTrips ]
    }

    checkIn(id, stationName, t) {
        this.customer[id] = [ stationName, t ]
    }

    checkOut(id, stationName, t) {
        const [ startStation, startTime ] = this.customer[id]
        let key = `${startStation}-${stationName}`
        let totalTime = t - startTime

        if (!this.avg[key]) {
            this.avg[key] = [ totalTime, 1 ]
        } else {
            const [ prevTotal, prevNumTrips ] = this.avg[key]
            this.avg[key] = [ prevTotal+totalTime, prevNumTrips+1]
        }
    }

    getAverageTime(startStation, endStation) {
        let key = `${startStation}-${endStation}`

        if (this.avg[key]) {
          const [ totalTime, numTrips] = this.avg[key]
          return totalTime / numTrips
        }
    }
}

```

### 1656 Design an Ordered Stream
- stream of n (idKey, value) pairs
  - arriving in arbitrary order
  - 1 < idKey < n (unique)
  - value''
- return values in increasing order by IDs
  - by returning a chunk (list) of values after each insertion

```javascript
class OrderedStream {
  constructor(n) {
    this.stream = {}
    this.current = 1  // idKey starts @ 1
  }

  insert(idKey, value) {
    this.stream[idKey] = value
    const chunkToSend = []

    while (this.stream[this.current]) {
      chunkToSend.push(this.stream[this.current])
      this.current++
    }

    return chunkToSend
  }
}
```

### 1169 Invalid Transactions
```javascript
const invalidTransactions = (transactions) => {
  // initialize new transactions[] with false flag
  // loop through transactions
    // compare i, i+1
    // if invalid => flip flag to true

  // initialize results[]
  // loop where invalid === true
    // push to results arr

  // return results[]

  const invalidFlags = new Array(transactions.length).fill(false)
  const res = []

  for (let i=0; i<transactions.length; i++) {
    const [name1, time1, amount1, city1] = transactions[i].split(',')

    if (amount1 > 1000) invalidFlags[i] = true

    for (let j=i+1; j<transactions.length; j++) {
      const [name2, time2, amount2, city2] = transactions[j].split(',')

        const isInvalid = city1 !== city2 && name1 === name2 && Math.abs(time2-time1) <= 60
    
        if (isInvalid) {   // when do we flip flag to true?
          invalidFlags[i] = true
          invalidFlags[j] = true
        }
    }
  }

  for (let k=0; k<invalidFlags.length; k++) {
    if (invalidFlags[k]) res.push(transactions[k])
  }

  return res
}
```

### 430 Flatten a Multilevel Doubly Linked List
```javascript
```

### 253 Meeting Rooms II
```javascript
```

### 1244 Design a Leaderboard
```javascript
class Leaderboard {
  constructor() {
      this.map = {}
  }

  addScore(playerId, score) {
      if (this.map[playerId]) {
          this.map[playerId] += score
      } else {
          this.map[playerId] = score
      }
  }

  top(K) {
      const scores = Object.values(this.map).sort((a,b) => b-a)
      let sum = 0
      let idx = 0
      
      while(idx < K) {
          sum += scores[idx]
          idx++
      }

      return sum
  }

  reset(playerId) {
      delete this.map[playerId]
  }
}
```

### 1209 Remove All Adjacent Duplicates in String II
```javascript
```

### 394 Decode String
```javascript
/**
    Possibilities:
    1. num  => currNum += num
    2. str  => currStr += str
    3. [    => new sequence
            => add currStr + currNum to stack
            => reassign both vals
    4. ]    => sequence over
            => create substr
            => prevStr, and prevNum from stack
            => add prevStr (prevNum times) to currStr
 */
  const stack = []
  let currNum = 0
  let currStr = ''

  for (let i=0; i<s.length; i++) {
      if (s[i] === '[') {
          stack.push(currStr)
          stack.push(currNum)
          currStr = ''
          currNum = 0
      } else if (s[i] === ']') {
          let prevNum = stack.pop()
          let prevStr = stack.pop()
          currStr = prevStr + currStr.repeat(prevNum)
      } else if (!isNaN(s[i])) {    // string = Number
          currNum = currNum * 10 + Number(s[i])
          console.log(s[i])
      } else {                      // str
          currStr += s[i]
      }
  }
  return currStr

```


### 1583 Count Unhappy Friends
```javascript
  // preferences[] for n friends
  // n % 2 === 0
  // preferences sorted in order of preference
      // lower idx = more preferred
  // friends are divided into pairs[]
  // leads to unhappiness if
      // [x, y] & [u, v]
      // x: u > y
      // u: x > v
  // return num of unhappy friends

  let rankMap = {}

  // how they ranked the person they're paired with
  for (const [i,j] of pairs) {
      rankMap[i] = preferences[i].indexOf(j)
      rankMap[j] = preferences[j].indexOf(i)
  }

  let unhappy = 0

  for (let person=0; person<preferences.length; person++) {
      for (let rank=0; rank<rankMap[person]; rank++) {
          const partner = preferences[person][rank]
          if (rankMap[partner] > preferences[partner].indexOf(person)) {
              unhappy++
              break
          }
      }
  }
  
  return unhappy
```

### 
```javascript
```


### 723 Candy Crush
```javascript
```

### 140 Word Break II
```javascript
```

### 1347 Minimum Number of Steps to Make Two Strings Anagram
```javascript
```

### 1236 Web Crawler
```javascript
class Node {
  // Doubly linked list
  constructor(val, next, prev) {
    this.val = val
    this.next = next
    this.prev = prev
  }
}

class BrowserHistory {
  constructor(homepage) {
    let node = new Node (homepage, null, null)
    this.curr = node
  }

  visit(url) {
    let node = new Node(url, null null)
    node.prev = this.curr   // homepage
    this.curr.next = node   // WHY
    this.curr = node        // now we're @ url
  }

  back(steps) {
    while (steps && this.curr.prev) {
      steps--
      this.curr = this.curr.prev
    }

    return this.curr.val
  }

  forward(steps) {
    while (steps && this.curr.next) {
      steps--
      this.curr = this.curr.next
    }

    return this.curr.val
  }
}
```

### 1823 Find the Winner of the Circular Game
```javascript
const findTheWinner = (n, k) => {
  // n friends playing a game
  // sitting in circle range(1, n) clockwise
  // k friends in clockwise direction
      // including start friend
      // counting wraps around circle
      // friends may be counted 1x+
      // last friend counted leaves circle + loses
  // if friends remain
      // go back to step 2
  
  // Build queue
  const queue = []
  for (let i=1; i<=n; i++) queue.push(i)

  while (queue.length > 1) {
    let deleteCount = k
    while (deleteCount > 1) {    // want 1 person remaining
      deleteCount--
      queue.push(queue.shift())  // rotate
    }
    queue.shift()                // delete Kth ele
  }

  return queue[0]                // winner
}

```

### 1472 Design Browser History
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

### 
```javascript
```

### 
```javascript
```