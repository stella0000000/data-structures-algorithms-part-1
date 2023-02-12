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
  const aIdx = 0
  const bIdx = 1
  const mid = costs.length / 2
  let sum = 0

  for (let i=0; i<sorted.length; i++) {
      if (i < mid) {
          // sum += sorted[i][0]
          sum += sorted[i][aIdx]
      } else {
          sum += sorted[i][bIdx]
          // sum += sorted[i][1]
      }
  }

  return sum
}
```

### 380 Insert Delete GetRandom O(1)
```javascript
class RandomizedSet {
    constructor() {
        this.arr = new Array()
        this.map = new Map()
        // { arr[idx]: idx}
    }

    insert(val) {
        if (this.map.has(val)) return false
        this.arr.push(val)
        this.map.set(val, this.arr.length-1)
        return true
    }

    remove(val) {
        if (!this.map.has(val)) return false
        const idx = this.map.get(val);

        // swap last arr val + arr[idx] @ val
        [this.arr[idx], this.arr[this.arr.length-1]] = [this.arr[this.arr.length-1], this.arr[idx]]
        // [ arr[idx], arr[last] ]
        // [ arr[last, arr[idx] ]


        // adjust map from arr swap
        this.map.set(this.arr[idx], idx)
        
        // finally remove
        this.arr.pop()
        this.map.delete(idx)
        return true
    }

    getRandom() {
        const random = Math.floor(Math.random()*this.arr.length)
        return this.arr[random]
    }
}

  getRandom() {
    const random = Math.floor(Math.random()*this.arr.length)
    return this.arr[random]
  }
}
```

### 1396 Design Underground System
```javascript
class UndergroundSystem {
    constructor() {
        this.customer = {}
        // { id: [startStation, startTime] }

        this.avgs = {}
        // { startStation-endStation: [ totalTime, numTrips ] }
    }

    checkIn(id, stationName, t) {
        this.customer[id] = [ stationName, t ]
    }

    // get start info from this.customer[id]
    // add to avgs{}
    checkOut(id, stationName, t) {
        const [ startStation, startTime ] = this.customer[id]
        const [ endStation, endTime ] = [ stationName, t ]

        const key = `${startStation}-${endStation}`
        const totalTime = endTime - startTime

        // check if we have this route in avgs
        if (this.avgs[key]) {
            const [ time, numTrips ] = this.avgs[key]
            this.avgs[key] = [ totalTime+time, numTrips+1]

        } else { // if not, it's the first trip
            const numTrips = 1
            this.avgs[key] = [ totalTime, numTrips ]
        }
    }

    // avg: { startS-endS: [totalTime, numTrips]}
    getAverageTime(startStation, endStation) {
        const [ totalTime, numTrips ] = this.avgs[`${startStation}-${endStation}`]
        return totalTime / numTrips
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
      this.currId = 1
  }

  insert(idKey, value) {
      this.stream[idKey] = value
      const sendable = []

      while (this.stream[this.currId]) {
          sendable.push(this.stream[this.currId])
          this.currId++
      }

      return sendable
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

  // for (let k=0; k<invalidFlags.length; k++) {
  //   if (invalidFlags[k]) res.push(transactions[k])
  // }

  invalidFlags.map((flag, key) => flag ? res.push(transactions[key]) : null)

  return res
}
```

### 430 Flatten a Multilevel Doubly Linked List
```javascript
const flatten = (head) => {
  // DFS
  if (!head) return null

  let curr = head
  const stack = []

  while (curr !== null) {
      if (curr.child) {
          if (curr.next) stack.push(curr.next)
          curr.next = curr.child
          curr.next.prev = curr
          curr.child = null
      } else if (curr.next === null && stack.length) {
          // no next, but we have on stack..
          curr.next = stack.pop()
          curr.next.prev = curr
      }
      
      curr = curr.next
  }
  
  return head
}
```

### 253 Meeting Rooms II
```javascript
const minMeetingRooms = (intervals) => {
  // sorted arr of startTimes
  // sorted arr of endTimes
  // compare startTimes + endTimes
      // start pointer + end pointer
  // increment count if startTime[startIdx] < endTime[endIdx]
      // i.e. if another starts before one ends
      
  const startTimes = intervals.map(int => int[0]).sort((a, b) => a-b)
  // [ 0, 5, 15 ]
  const endTimes = intervals.map(int => int[1]).sort((a, b) => a-b)
  // [ 10, 20, 30 ]

  let startIdx = 0
  let endIdx = 0
  let count = 0

  while (startIdx < intervals.length) {
    (startTimes[startIdx] < endTimes[endIdx]) ? count++ : endIdx
    startIdx++
  }

  return count
}

```

### 1244 Design a Leaderboard
```javascript
class Leaderboard {
  constructor() {
      this.map = {}
      // { playerId: score }
  }

  addScore(playerId, score) {
      // if (this.map[playerId]) {
      //     this.map[playerId] += score
      // } else {
      //     this.map[playerId] = score
      // }

      this.map[playerId] = this.map[playerId]+score || score
  }

  top(K) {
      const scores = Object.values(this.map).sort((a,b) => b-a)
      let sum = 0
      for (let i=0; i<K; i++) sum += scores[i]
      return sum
  }

  reset(playerId) {
      delete this.map[playerId]
  }
}
```

### 1209 Remove All Adjacent Duplicates in String II
```javascript
const removeDuplicates = (s, k) => {
  // stack LIFO
  const stack = []
  // [ letter, numOccurance ] => [ [a, 3], [b, 1] ] sorta vibe

  for (const char of s) {
      if (!stack.length) {
          stack.push( [ char, 1 ] ) // empty stack, so just push
          // break // jk
          continue
      }

      // we have stuff in our stack, let's check them
      const [ prevChar, prevCount ] = stack[stack.length-1]
      if (char !== prevChar) { // new letter to consider
          stack.push( [ char, 1 ] )
      } else {    // same chars, do fancy things
          let newCount = prevCount + 1

          if (newCount === k) {
              stack.pop() // delete them
          } else {
              stack[stack.length-1][1] = newCount // update count!!!! [1]
          }
      }
  }

  return stack.map(arr => arr[0].repeat(arr[1])).join('')

//   const stack = [] // [[a, 1], [b, 2]]
  
//   for (const char of s) {
//     if (!stack.length) {
//       stack.push([char, 1])
//       continue
//     }

//     const [prevChar, prevCount] = stack[stack.length-1]

//     if (char !== prevChar) { // new letter
//       stack.push([char, 1])
//     } else {                 // prevChar === char
//       let count = prevCount + 1

//       if (count === k) {
//         stack.pop()
//       } else {
//         stack[stack.length-1][1] = count
//       }
//     }
//   }

//   return stack.map(arr => arr[0].repeat(arr[1])).join('')
}

```

### 797 All Paths From Source to Target
```javascript
const allPathsSourceTarget = (graph) => {
  // directed acyclic graph
  // all possible paths from node 0 to node n-1

  // DFS recursive
  const allPaths = []
  findPaths(0, graph, allPaths, [])   // source node, graph, allPaths[], initial currPaths[]
  return allPaths
}

const findPaths = (currNode, graph, allPaths, currPaths) => {
    currPaths.push(currNode)

    if (currNode === graph.length-1) {
        allPaths.push(currPaths)
        return
    }

    for (let neighbor of graph[currNode]) {
        findPaths(neighbor, graph, allPaths, [...currPaths])  // WHY destructure
    }

    return allPaths
}
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
  // initialize stack [ [ letter, numOfOccurance]]
    // track currStr, currNum
    // iterate through string
    // if
        // '[' start sequence
            // push [currStr, currNum] to stack
            // reset currStr, currNum
        // ']' end sequence
            // pop prevBuiltStr, prevNum
            // currStr = prevStr + currStr.repeat(prevNum)
        // letter
            // add to running currStr
        // number
            // append to running currNum

  // return currStr
  const numbers = '0123456789'
  const stack = []
  let currNum = 0
  let currStr = ''

  for (const char of s) {
    if (char === '[') {
        stack.push([ currStr, currNum ])
        currStr = ''
        currNum = 0
    } else if (char === ']') {
        const [ runningStr, runningNum ] = stack.pop()
        currStr = runningStr + currStr.repeat(runningNum)
    } else if (numbers.includes(char)) {
        currNum = currNum*10 + Number(char)
    } else {    // char is a letter
        currStr += char
    }
  }

  return currStr

```

### 1274 Number of Ships in a Rectangle
```javascript
const countShips = (sea, topRight, bottomLeft) => {
  // Sea.hasShips(topRight, bottomLeft) => boolean
  if (!sea.hasShips(topRight, bottomLeft)) return 0
  if (topRight[0] === bottomLeft[0] && topRight[1] === bottomLeft[1]) return 1

  // topRight [x0, y0]
  // bottomLeft [x1, y1]
  const midX = Math.floor((topRight[0] + bottomLeft[0]) / 2)
  const midY = Math.floor((topRight[1] + bottomLeft[1]) / 2)
  /*

  [                 tR[0], tR[1]


              mX, mY


  bL[0], bL[1]                  ]

  */
  
  const bottomLeftQuad = countShips(sea, [midX, midY], bottomLeft)
  const bottomRightQuad = countShips(sea, [topRight[0], midY], [midX+1, bottomLeft[1]])
  const topLeftQuad = countShips(sea, [midX, topRight[1]], [bottomLeft[0], midY+1])
  const topRightQuad = countShips(sea, topRight, [midX + 1, midY + 1])   
  
  return bottomLeftQuad + bottomRightQuad + topLeftQuad + topRightQuad
};
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

  // create a rankingMap
  // of [person]: how they ranked their pair
  const rankMap = {}
  for (const [i, j] of pairs) {
      rankMap[i] = preferences[i].indexOf(j)
      rankMap[j] = preferences[j].indexOf(i)
  }

  let unhappy = 0
  // loop through each person
  for (let person=0; person<preferences.length; person++) {

      // check up to the ranking of my actual pair
      // i'm is unhappy if
        // my first choice partner ranked THEIR partner later than me
            // rankMap[partner] > preferences[partner].indexOf(me)
        // loop through rankings up to who i'm paired with
      for (let ranking=0; ranking<rankMap[person]; ranking++) {

          // go up person's preferences
          const partner = preferences[person][ranking]
          if (rankMap[partner] > preferences[partner].indexOf(person)) {
              unhappy++
              break   // they're already unhappy, avoid double counting
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
const getEliminations = = (board) => {
  const eliminate = board.map(row => new Array(row.length).fill(false))

  // in a loop board[row][col]
      // find all eliminations and replace with 0
      // did Eliminate ? drop candies : break
  for (let row=0; row<board.length; row++) {
    for (let col=0; col<board[row].length; col++) {
      // let currPosition = board[row][col]
      let startCol = col
      let endCol = col

      // horizontally (col++) by row
      while (endCol<board[row].length
              && board[row][startCol] === board[row][endCol]
              && board[row][startCol] !== 0) {
        endCol++
      }

      // if we find at least 3 matching, contiguous subarrays
      // eliminate[row, col], and corresponding cells => true
      if (endCol-startCol >= 3) {
        for (let elimCol=startCol; elimCol<endCol; elimCol++) {
          eliminate[row][elimCol] = true
        }
      }
    }
  }

  for (let col=0; col<board[0].length; col++) {
    for (let row=0; row<board.length; row++) {
      let startRow = row
      let endRow = row

      // move vertically (row++) by col
      while (endRow<board.length 
          && board[startRow][col] === board[endRow][col]
          && board[startRow][col] !== 0) {
        endRow++
      }

      // if we find at least 3 matching, contiguous subarrays
      // eliminate[row, col], and corresponding cells => true
      if (endRow-startRow >= 3) {
        for (let elimRow=startRow; elimRow<endRow; elimRow++) {
          eliminate[elimRow][col] = true
        }
      }
    }
  }

  return eliminate; //[ [] [] [] ]
}

// Returns true if we flip ANYTHING to 0
const applyEliminations = (board, eliminations) => {
    let didFlip = false
    for (let row=0; row<eliminations.length; row++) {
      for (let col=0; col<eliminations[row].length; col++) {
        if (eliminations[row][col]) {
          didFlip = true
          board[row][col] = 0
        }
      }
    }

    return didFlip
}

// Takes a board, for any 0s below non-zero squares, drop the column above it.
const dropSquares = = (board) => {
    // travel vertically by col
    // start from bottom
    for (let col=board[0].length-1; col>=0; col--) {
        const newCol = []
        for (let row=board.length-1; row>=0; row--) {
            if (board[row][col] !== 0) {
                // get all non-zeros in order board[row]= non-zeros, and append 0's to match height
                newCol.push(board[row][col])
            }
        }
        while (board.length > newCol.length) {
            newCol.push(0)
        }
        for (let row=0; row<board.length; row++) {
            board[row][col] = newCol.pop()
        }
    }
}

const candyCrush = (board) => {
    while (true) {
        const eliminations = getEliminations(board);
        if (applyEliminations(board, eliminations)) {
            // Then we have to do drops
            dropSquares(board);
        } else {
            break
        }
    }

    return board
};
```

### 140 Word Break II
```javascript
const wordBreak = (s, wordDict) => {
  // trie, dynamic, {}, backtracking

  const wordSet = new Set(wordDict);/* Time O(N)   | Space O(N) */
  return canBreak(s, wordSet);      /* Time O(2^N) | Space O(N) */

  var canBreak = (s, wordSet, start = 0) => {
    const isBaseCase = (start === s.length);
    if (isBaseCase) return true;

    return dfs(s, wordSet, start); /* Time O(2^N) | Space O(N) */
  }

  var dfs = (s, wordSet, start) => {
    for (let end = (start + 1); end <= s.length; end++) {/* Time O(N) */
      const word = s.slice(start, end);                    /* Time O(N)   | Space O(N) */

      const _canBreak = wordSet.has(word)
          && canBreak(s, wordSet, end);                    /* Time O(2^N) | Space O(N) */
      if (_canBreak) return true;
    }

    return false;
  }
}
```

### 1347 Minimum Number of Steps to Make Two Strings Anagram
```javascript
```

### 1236 Web Crawler
```javascript
const crawl = (startUrl, htmlParser) => {
  // breadth first search => queue
  const hostname = startUrl.split('/')[2]
  const getHostname = (url) => url.split('/')[2]
  const set = new Set([startUrl])
  const queue = [ startUrl ]        // start the q, urls to htmlpar

  while (queue.length) {
    let currUrl = queue.shift()
    for (const url of htmlParser.getUrls(currUrl)) {
      if (!set.has(url) && getHostname(url).includes(hostname)) {
        set.add(url)
        queue.push(url)
      }
    }
  }

  // console.log([...set.values()])
  return [...set.values()]


  // depth first search => recursive
  //   const hostname = startUrl.split('/')[2]
  //   const getHostname = (url) => url.split('/')[2]
  //   const set = new Set([startUrl])

  //   const DFS = (currUrl) => {
  //     for (const url of htmlParser.getUrls(currUrl)) {
  //       if (!set.has(url) && getHostname(url).includes(hostname)) {
  //         set.add(url)
  //         DFS(url)
  //       }
  //   }
  // }

  //   DFS(startUrl)
  //   return [...set.values()]
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

### 146 LRU Cache
```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
        // this.capacity = 3
        // this.cache = { 1: a, 2: b, 3: c }
        // LRU => MRU
        // if we add, and @ capacity
            // eject LRU, 1: a
        // { 2: b, 3: c, 4: d}
            // 2: b is LRU
    }

    get(key) {
        if (!this.map.has(key)) {
            return -1
        } else {
            let val = this.map.get(key)
            this.map.delete(key)
            this.map.set(key, val)
            return val
        }

        // get an element
        // delete it
        // add it back on - to the end
    }

    // update val of key if key exists
    // else add key-val pair to cache
    // if num keys > capacity
    put(key, value) {
        // if it exists
            // get the element
            // auto shift everything else over
            // add element to end MRU
            // change the value
        if (this.get(key) === -1) { // we don't have this value yet
            if (this.map.size === this.capacity) {
                // delete the first one (i.e. LRU)
                for (const val of this.map) {
                    this.map.delete(val[0])
                    break
                }
            }
            
            this.map.set(key, value)
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