## 01 Integer Multiplication
Input: two n-digit numbers, x and y.
Output: product x*y
"Primitive operation": add or multiply two single-digit numbers

- Grade school algorithm
  5678
x 1234
-------
=> focus on # of basic operations algorithm performs as function of input # length

- Karatsuba Multiplication => recursion
x = 5678
y = 1234

a = 56, b = 78
c = 12, d = 34

## 02 Design & Analysis of Algorithms
Course Topics
- Vocabulary for design & analysis of algorithms
  - Big O notation
  - "Sweet spot" for high-level reasoning about algorithms
    - Focus on how algorithm scales with large input sizes
    - Ignore constant factors + lower order terms
- Divide and conquer algorithm design paradigm
  - The idea is to break problem into small problem to be solved recursively
  - Will apply to: integer multiplication, sorting, matrix, multiplication, nearest neighbors
  - General analysis methods "master method/theorem"
- Randomization in algorithm design
  - Application: quicksort, primality testing, graph partitioning, hashing
  - Different executions if you run it repeatedly
  - Simple, elegant, practical solutions
- Primitives for reasoning about graphs
  - Connectivity info, shortest paths, structure of info, social networks
- Use and implementation of data structures
  - Data structure is responsible for organizing data to support fast queries
  - Heaps, balanced binary search trees, hashing, and variants (e.g. bloom filters)
- Greedy algorithm design paradigm
  - Scheduling, minimum spanning trees
- Dynamic programming
  - Shortest path
- NP-complete problems and what to do about them
  - "P not equal to NP"

## 03 Merge Sort: Motivation & Example
- Good intro to divide and conquer
  - Improves over Selection, Insertion, Bubble sorts
- Break down to smaller sub problems, which you solve recursively, and then combine results of smaller sub-problem to get a solution to the original problem
- Motivates guiding principles for algorithm analysis (worst case, asymptotic analysis)

The Sorting Problem
- Input: array of n numbers
  [5, 4, 1, 8, 7, 2, 6, 3], assume distinct numbers in our case
- Output: same numbers, sorted in increasing order
  [1, 2, 3, 4, 5, 6, 7, 8]

Merge Sort Example
- Recursive
- Spawn off calls of itself on smaller arrays

[5, 4, 1, 8, 7, 2, 6, 3]
1. Smaller recursive problems [5, 4, 1, 8], [7, 2, 6, 3]
2. Returns [1, 4, 5, 8], [2, 3, 6, 7]
3. Combine the two arrs "the merge"
  - walk pointers down each of the 2 sortted subarrays
  - copy over, populating output array in sorted order

Pseudocode
- Recursively sort 1st half of input arr
- Recursively sort 2nd half of input arr
- Merge two sorted sublists into one
- Base case: 0-1 elements, already sorted, so return immediately
- Consider odd # of elements

C = output (length = n)
A = 1st sorted arr (n/2)
B = 2nd sorted arr (n/2)
i = 1, j = 1

for k = 1 to n
  if A(i) < B(j)
    C(k) = A(i)
    i++
  else (B(j) < A(i)) 
    C(k) = B(j)
    j++

```javascript
const merge = (left, right) => {
  const sorted = []

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift())
    }
  }

  return [...sorted, ...left, ...right]
}

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr // base case
  const mid = Math.floor(arr.length / 2)

  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  return merge(left, right)
}
```

Running Time?
- Key Question: running merge sort in a debugger, how many times do we need to hit "run"
- ~ number of lines of code executed

Recursion tree method
- Children of a given node corresponds to recursive calls made by that node
- Facilitates counting overall work done by algorithm
- sqrt(n) => tree branches from the root => the # of times you need to divide n by two til it bottoms out to 1 (base cases, i.e. no more recursion)

Proof of claim (assuming n = power of 2)
- at each level j = 0, 1, 2, ..., log_2(n)
- 2^j subproblems, each of size n/(2^j)
=> 6nlog(n) + 6n operations at most

## 04 Guiding principles for analysis of algorithms

3 assumptions to reason about algorithms
1. Worst case analysis
  - Over running time
  - Bound holds for every input of length n
2. Won't pay much attn to constant factors, lower-order terms
  - Justification: easier mathematically, constants depend on architecture / compiler / programmer anyway
3. Asymptotic analysis: performance of algorithm as size N of input grows large => to infinity
  - Focus on runtime for large input sizes
  - Justification: only big problems are relevant, Moore's law

## 05 Asymptotic Analysis
Motivation
- Importance: vocabulary for the design and analysis of algorithms (e.g. big o notation)
- "Sweet spot" for high level reasoning about algorithms
- Course enough to suppress arch, language, compiler dependent details
- Sharp enough to make userful comparisons between different algorithms, especially on large inputs (e.g. sorting, integer multiplication)

What is it
- High level idea: suppress constant factors and lower order terms
  - Constant factors: too system dependent
  - Lower order terms: irrelevant for large inputs
- Example: equate 6nlog(n) + 6n => nlogn
- Terminology: runtime is O(nlogn)

## 06 Big Oh Notation
- Q: when is T(n) = O(f(n))?
- A: if eventually for all sufficiently large n, T(n) is bounded above by a constant multiple of f(n)

## 06 O(nlog(n)) Algorithm for Counting Inversions

Divide and Conquer Paradigm
1. Divide into smaller subproblems
2. Conquer via recursive calls
3. Combine solutions of subproblems into one for the original problem

The Problem
- Input: array A containing the numbers 1, 2, 3, ..., n in some arbitrary order
- Output: number of inversions = number of pairs (i, j) of array indicies with i < j, and A[i] > A[J]
- i.e. sorted increasingly has 0 inversions
- Example: [1, 3, 5, 2, 4, 6]
- Inversions
  (3, 2), (5, 2), (5, 4) = indicies
- Motivation
  - Numerical similarity measure quantifying how close to different ranked lists are to each other
  - Collaborative filtering
- Largest possible # of inversions for 6 element arr
  n(n-1) / 2

Brute force
- Double for loop
  i, j>i => add to running count where A[i] > A[J]
- O(n^2) quadratic

Merge Sort
  count (arr A, length n)
    if n=1 return 0
    else
      x = count(1st half or A, n/2)
      y = count(2nd half of A, n/2)
      z = count split inv (A, n)
    return x+y+z

  Goal: implement count split inv in linear O(nlogn)

