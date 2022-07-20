export class Node<K> {
  left: Node<K> | undefined
  right: Node<K> | undefined
  public key: K

  constructor(key: K) {
    this.key = key
  }

  toString() {
    return `${this.key}`
  }
}

export enum Colors {
  RED = 0,
  BLACK = 1
}

export class RedBlackNode<K> {
  left!: RedBlackNode<K>
  right!: RedBlackNode<K>
  parent!: RedBlackNode<K>
  key: K
  color: Colors

  constructor(key: K) {
    this.key = key
    this.color = Colors.RED
  }

  /**
   * @description 判断节点颜色
   * @function isRed
   */
  isRed(): boolean {
    return this.color === Colors.RED
  }

  /**
   * @description 变换颜色
   * @function flipColor
   */
  flipColor() {
    if (this.color === Colors.RED) {
      this.color = Colors.BLACK
    } else {
      this.color = Colors.RED
    }
  }
}
