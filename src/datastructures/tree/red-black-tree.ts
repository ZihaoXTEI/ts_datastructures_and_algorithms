import { Colors, RedBlackNode } from './models/node'
import BinarySearchTree from './binary-search-tree'
import { Compare, defaultCompare, ICompareFunction } from '../../utils/utils'

export default class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root!: RedBlackNode<T>

  constructor(compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn)
  }

  /**
   * 右旋转
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotateRight(b) ->  c   b
   *    / \                             / \
   *   c   d                           d   e
   */
  private rotateRight(node: RedBlackNode<T>) {
    const temp = node.left
    node.left = temp?.right
    if (temp?.right && temp.right.key) {
      temp.right.parent = node
    }
    temp.parent = node.parent

    if (!node.parent) {
      this.root = temp
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp
      } else {
        node.parent.right = temp
      }
    }
    temp.right = node
    node.parent = temp
  }

  /**
   * 左旋转
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotateLeft(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   */
  private rotateLeft(node: RedBlackNode<T>) {
    const temp = node.right
    node.right = temp.left
    if (temp.left && temp.left.key) {
      temp.left.parent = node
    }

    temp.parent = node.parent
    if (!node.parent) {
      this.root = temp
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp
      } else {
        node.parent.right = temp
      }
    }

    temp.left = node
    node.parent = temp
  }

  /**
   * @description 向红黑树插入节点
   * @function insert
   * @param key 键
   */
  insert(key: T): void {
    if (this.root == null) {
      this.root = new RedBlackNode(key)
      this.root.color = Colors.BLACK
    } else {
      const newNode = this.insertNode(this.root, key)
      this.fixTreeProperties(newNode)
    }
  }

  protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key)
        // 保存被插入节点父节点的引用
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key)
      node.right.parent = node
      return node.right
    } else {
      return this.insertNode(node.right, key)
    }
  }

  private fixTreeProperties(node: RedBlackNode<T>) {
    while (
      node &&
      node.parent &&
      node.parent.color === Colors.RED &&
      node.color !== Colors.BLACK
    ) {
      let parentNode = node.parent
      const grandParentNode = parentNode.parent

      // 情况 A ：父节点是左侧子节点
      if (grandParentNode && grandParentNode.left === parentNode) {
        const uncleNode = grandParentNode.right

        // 情况 A1 ： 叔叔节点也是红色，满足 情况三
        // 需要 父红叔红祖黑 --> 父黑叔黑祖红
        if (uncleNode && uncleNode.color === Colors.RED) {
          grandParentNode.color = Colors.RED
          parentNode.color = Colors.BLACK
          uncleNode.color = Colors.BLACK
          // 当前节点指向祖父节点，以继续检查树是否存在其它冲突
          node = grandParentNode
        } else {
          // 情况 A2 ：父节点是祖父节点的左侧子节点，节点是父节点的右侧子节点
          // 需要进行左旋转
          if (node === parentNode.right) {
            // 以父节点为基准，进行左旋转
            this.rotateLeft(parentNode)
            node = parentNode
            parentNode = node.parent
          }
          // 情况 A3 ：父节点是祖父节点的左侧子节点，节点是父节点的左侧子节点
          // 以祖父节点为基准，进行右旋转
          this.rotateRight(grandParentNode)

          // 交换颜色
          parentNode.color = Colors.BLACK
          grandParentNode.color = Colors.RED
          node = parentNode
        }
      }
      // 情况 B ：父节点是右侧子节点
      else {
        const uncleNode = grandParentNode.left

        // 情况 B1 ： 叔叔节点也是红色，满足 情况三
        // 需要 父红叔红祖黑 --> 父黑叔黑祖红
        if (uncleNode && uncleNode.color === Colors.RED) {
          grandParentNode.color = Colors.RED
          parentNode.color = Colors.BLACK
          uncleNode.color = Colors.BLACK
          node = grandParentNode
        } else {
          // 情况 B2 ： 父节点是祖父节点的右侧子节点，节点是父节点的左侧子节点
          // 需要进行左旋转
          if (node === parentNode.left) {
            // 以父节点为基准，进行右旋转
            this.rotateRight(parentNode)
            node = parentNode
            parentNode = node.parent
          }

          // 情况 B3 ： 父节点是祖父节点的右侧子节点，节点是父节点的右侧子节点
          // 以祖父节点为基准，进行左旋转
          this.rotateLeft(grandParentNode)
          // 交换颜色
          parentNode.color = Colors.BLACK
          grandParentNode.color = Colors.RED
          node = parentNode
        }
      }
    }

    // 保证根节点是黑色
    this.root.color = Colors.BLACK
  }
}
