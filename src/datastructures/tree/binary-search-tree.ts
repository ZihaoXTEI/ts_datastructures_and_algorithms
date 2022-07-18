import { Node } from './models/node'
import { Compare, defaultCompare, ICompareFunction } from '../../utils/utils'

export default class BinarySearchTree<T> {
  protected root: Node<T> | undefined
  private compareFn: ICompareFunction<T>

  constructor(compareFn: ICompareFunction<T> = defaultCompare) {
    this.root = undefined
    this.compareFn = compareFn
  }

  /**
   * @description 向二叉搜索树插入节点
   * @function insert
   * @param key 键
   */
  insert(key: T) {
    if (this.root == null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  protected insertNode(node: Node<T>, key: T) {
    // 如果传入的 key 小于当前的节点，则插入当前节点左边
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key)
      } else {
        // 当前节点的左子树非空，继续遍历
        this.insertNode(node.left, key)
      }
    }
    // 如果传入的 key 大于当前的节点，则插入当前节点右边
    else {
      if (node.right == null) {
        node.right = new Node(key)
      } else {
        // 当前节点的右子树非空，继续遍历
        this.insertNode(node.right, key)
      }
    }
  }

  /**
   * @description 中序遍历二叉搜索树（左 根 右）
   * @function inOrderTraverse
   * @param callback 回调函数
   */
  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback)
  }

  private inOrderTraverseNode(node: Node<T> | undefined, callback: Function) {
    if (node != null) {
      // 处理经过节点的左子节点
      this.inOrderTraverseNode(node.left, callback)
      // 处理经过的节点
      callback(node.key)
      // 处理经过节点的右子节点
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  /**
   * @description 先序遍历二叉搜索树（根 左 右）
   * @function preOrderTraverse
   * @param callback 回调函数
   */
  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback)
  }

  private preOrderTraverseNode(node: Node<T> | undefined, callback: Function) {
    if (node != null) {
      // 处理经过的节点
      callback(node.key)
      // 处理经过节点的左子节点
      this.preOrderTraverseNode(node.left, callback)
      // 处理经过节点的右子节点
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  /**
   * @description 后序遍历二叉搜索树（左 右 根）
   * @function postOrderTraverse
   * @param callback 回调函数
   */
  postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback)
  }

  private postOrderTraverseNode(node: Node<T> | undefined, callback: Function) {
    if (node != null) {
      // 处理经过节点的左子节点
      this.postOrderTraverseNode(node.left, callback)
      // 处理经过节点的右子节点
      this.postOrderTraverseNode(node.right, callback)
      // 处理经过的节点
      callback(node.key)
    }
  }

  /**
   * @description 返回二叉搜索树中最小的值 / 键
   * @function min
   * @returns
   */
  min() {
    // let currentNode = this.root
    // // 二叉搜索树中最小的节点是最左边的叶子
    // while (currentNode != null && currentNode.left != null) {
    //   currentNode = currentNode.left
    // }

    // return currentNode
    if (this.root == undefined) {
      return null
    }
    return this.minNode(this.root)
  }

  private minNode(node: Node<T>) {
    let currentNode = node
    // 二叉搜索树中最小的节点是最左边的叶子
    while (currentNode != null && currentNode.left != null) {
      currentNode = currentNode.left
    }

    return currentNode
  }

  /**
   * @description 返回二叉搜索树中最大的值 / 键
   * @function max
   * @returns
   */
  max() {
    let currentNode = this.root
    // 二叉搜索树中最大的节点是最右边的叶子
    while (currentNode != null && currentNode.right != null) {
      currentNode = currentNode.right
    }

    return currentNode
  }

  /**
   * @description 在二叉搜索树中搜索一个键
   * @function search
   * @param key 键
   * @returns
   */
  search(key: T): boolean {
    if (this.root == null) {
      return false
    }
    return this.searchNode(this.root, key)
  }

  private searchNode(node: Node<T> | undefined, key: T): boolean {
    if (node == null) {
      return false
    }

    const compareResult = this.compareFn(key, node.key)
    // 如果搜索 key 值 小于当前比较的节点，则在左子树继续查找
    if (compareResult === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    }
    // 如果搜索 key 值 大于当前比较的节点，则在右子树继续查找
    else if (compareResult === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    }
    // 最后一种情况：等于
    return true
  }

  /**
   * @description 在二叉搜索树中移除传入的键
   * @function remove
   * @param key 键
   */
  remove(key: T) {
    this.root = this.removeNode(this.root, key)
  }

  protected removeNode(node: Node<T> | undefined, key: T) {
    if (node == null) {
      return undefined
    }

    const compareResult = this.compareFn(key, node.key)
    if (compareResult === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (compareResult === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      if (node.left === null && node.right == null) {
        node = undefined
        return node
      }

      if (node.left == null) {
        node = node.right
        return node
      } else if (node.right == null) {
        node = node.right
        return node
      }

      const aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }

  /**
   * @description 返回二叉搜索树的根节点
   * @function getRoot
   * @returns
   */
  getRoot() {
    return this.root
  }
}
