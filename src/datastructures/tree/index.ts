import BinarySearchTree from './binary-search-tree'
import RedBlackTree from './red-black-tree'

console.log('==========树结构 二叉搜索树==========')
const binarySearchTree = new BinarySearchTree<number>()
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
const handler = (key: any) => {
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

binarySearchTree.remove(5)
binarySearchTree.remove(18)
reusltString = ''
binarySearchTree.inOrderTraverse(handler)
console.log('中序遍历：', reusltString)

console.log('==========树结构 红黑树==========')
const redBlackTree = new RedBlackTree<number>()
redBlackTree.insert(1)
redBlackTree.insert(5)
redBlackTree.insert(9)
redBlackTree.insert(16)
redBlackTree.insert(20)
redBlackTree.insert(28)
redBlackTree.insert(39)
redBlackTree.insert(32)
redBlackTree.insert(22)
redBlackTree.insert(17)
redBlackTree.insert(15)
redBlackTree.insert(12)
redBlackTree.insert(6)
let reusltString2 = ''
const handler2 = (key: any) => {
  reusltString2 += `${key} `
}

redBlackTree.inOrderTraverse(handler2)
console.log('中序遍历：', reusltString2)
