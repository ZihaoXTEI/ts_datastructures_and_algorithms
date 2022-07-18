class BinarySearchTree {
  constructor() {
    this.root = null
  }

  // 向树中插入一个新的键
  insert(key) {
    let newNode = new Node(key)
    if (this.root == null) {
      this.root = newNode
    } else {
      this._insertNode(this.root, newNode)
    }
  }

  _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      // 向左查找
      if (node.left == null) {
        node.left = newNode
      } else {
        this._insertNode(node.left, newNode)
      }
    } else {
      // 向右查找
      if (node.right == null) {
        node.right = newNode
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }

  // 在树中查找一个键
  search(key) {
    let currentNode = this.root

    while (currentNode != null) {
      if (currentNode.key > key) {
        currentNode = currentNode.left
      } else if (currentNode.key < key) {
        currentNode = currentNode.right
      } else {
        return true
      }
    }

    return false
  }

  // 通过中序遍历方式遍历所有节点
  inOrderTraverse(handler) {
    this._inOrderTraverseNode(this.root, handler)
  }

  _inOrderTraverseNode(node, handler) {
    if (node != null) {
      // 处理经过节点的左子节点
      this._inOrderTraverseNode(node.left, handler)
      // 处理经过的节点
      handler(node.key)
      // 处理经过节点的右子节点
      this._inOrderTraverseNode(node.right, handler)
    }
  }

  // 通过先序遍历方式遍历所有节点
  preOrderTraverse(handler) {
    this._preOrderTraverseNode(this.root, handler)
  }

  _preOrderTraverseNode(node, handler) {
    if (node != null) {
      // 处理经过的节点
      handler(node.key)
      // 处理经过节点的左子节点
      this._preOrderTraverseNode(node.left, handler)
      // 处理经过节点的右子节点
      this._preOrderTraverseNode(node.right, handler)
    }
  }

  // 通过后序遍历方式遍历所有节点
  postOrderTraverse(handler) {
    this._postOrderTraverseNode(this.root, handler)
  }

  _postOrderTraverseNode(node, handler) {
    if (node != null) {
      // 处理经过节点的左子节点
      this._postOrderTraverseNode(node.left, handler)
      // 处理经过节点的右子节点
      this._postOrderTraverseNode(node.right, handler)
      // 处理经过的节点
      handler(node.key)
    }
  }

  // 返回树中最小的值 / 键
  min() {
    let currentNode = this.root
    while (currentNode != null && currentNode.left != null) {
      currentNode = currentNode.left
    }
    return currentNode
  }

  // 返回树中最大的值 / 键
  max() {
    let currentNode = this.root
    while (currentNode != null && currentNode.right != null) {
      currentNode = currentNode.right
    }
    return currentNode
  }

  // 从树中移除某个键
  remove(key) {
    // 寻找要删除的节点
    let currentNode = this.root
    let parentNode = null
    let isLeftChild = true

    // 空树直接返回 false
    if (currentNode == null) return false

    // 寻找删除节点
    while (currentNode.key != key) {
      parentNode = currentNode
      if (key < currentNode.key) {
        isLeftChild = true
        currentNode = currentNode.left
      } else {
        isLeftChild = false
        currentNode = currentNode.right
      }

      // 没有找到，跳出循环，退出函数返回 false
      if (currentNode == null) return false
    }

    // 根据对应的情况删除节点
    // 删除的节点是叶子节点
    if (currentNode.left == null && currentNode.right == null) {
      if (currentNode == this.root) {
        this.root = null
      } else if (isLeftChild) {
        parentNode.left = null
      } else {
        parentNode.right = null
      }
    }
    // 删除的节点有一个子节点
    else if (currentNode.right == null) {
      if (currentNode == this.root) {
        this.root = currentNode.left
      } else if (isLeftChild) {
        parentNode.left = currentNode.left
      } else {
        parentNode.right = currentNode.left
      }
    } else if (currentNode.left == null) {
      if (currentNode == this.root) {
        this.root = currentNode.right
      } else if (isLeftChild) {
        parentNode.left = currentNode.right
      } else {
        parentNode.right = currentNode.right
      }
    }
    // 删除的节点有两个子节点
    else {
      // 获取后继节点
      let successor = this._getSuccessor(currentNode)

      // 判断是否根节点
      if (this.root === currentNode) {
        this.root = successor
      } else if (isLeftChild) {
        parentNode.left = successor
      } else {
        parentNode.right = successor
      }

      successor.left = currentNode.left
    }

    return true
  }

  _getSuccessor(delNode) {
    let successorParent = delNode
    let successor = delNode
    let currentNode = delNode.right

    // 寻找节点
    while (currentNode != null) {
      successorParent = successor
      successor = currentNode
      currentNode = currentNode.left
    }

    // 如果后继节点不是删除节点的右节点
    if (successor != delNode.right) {
      successorParent.left = successor.right
      successor.right = delNode.right
    }

    return successor
  }
}

class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

const binarySearchTree = new BinarySearchTree()
binarySearchTree.insert(7)
binarySearchTree.insert(15)
binarySearchTree.insert(5)
binarySearchTree.insert(3)
binarySearchTree.insert(9)
binarySearchTree.insert(8)
binarySearchTree.insert(10)
binarySearchTree.insert(13)
binarySearchTree.insert(12)
binarySearchTree.insert(14)
binarySearchTree.insert(20)
binarySearchTree.insert(18)
binarySearchTree.insert(25)

let reusltString = ''
const handler = (key) => {
  reusltString += `${key} `
}

binarySearchTree.inOrderTraverse(handler)
console.log('中序遍历：', reusltString)

reusltString = ''
binarySearchTree.preOrderTraverse(handler)
console.log('先序遍历：', reusltString)

reusltString = ''
binarySearchTree.postOrderTraverse(handler)
console.log('后序遍历：', reusltString)

console.log('搜索 10 ：', binarySearchTree.search(10))
console.log('搜索 2 ：', binarySearchTree.search(2))

console.log(binarySearchTree.remove(5))
console.log(binarySearchTree.remove(18))
console.log(binarySearchTree.remove(100))
reusltString = ''
binarySearchTree.inOrderTraverse(handler)
console.log('中序遍历：', reusltString)
