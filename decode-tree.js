// input: [ 0, 1, 2 ] => 'ad'
// "Can we assume this is always valid" - checking if node exists, etc

// implement the tree node
// (root, input) => decoded message
// children are list of nodes


/*
            root
          /     \
        'a'     '*'
              /  |   \
            'b'  'c'  'd'
 
*/


class TreeNode {
  constructor(val, children) {
    this.val = val
    this.children = children
  }
}

const buildExampleTree = () => {
  let nodeB = new TreeNode('b', null)
  let nodeC = new TreeNode('c', null)
  let nodeD = new TreeNode('d', null)

  let nodeStar = new TreeNode('*', [nodeB, nodeC, nodeD])
  let nodeA = new TreeNode('a', null)

  let root = new TreeNode('root', [nodeA, nodeStar])

  return root
}

const root = buildExampleTree()

const decode = (root, input) => {
  let curr = root
  const queue = input
  let result = ''

  while (queue.length) {
    curr = curr.children[queue.shift()]
    if (curr.val === '*') {
      continue
    } else {
      result += curr.val
      curr = root
    }
  }

  // consider: error checking with null, and within bounds

  console.log(result)
  return result
}

const input = [ 0, 1, 2 ]

decode(root, input)