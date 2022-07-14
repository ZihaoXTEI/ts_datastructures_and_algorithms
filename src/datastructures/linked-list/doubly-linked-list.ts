import { DoublyNode } from './models/node'

import { IEqualsFunction, defaultEquals } from '../../utils/utils'
import LinkedList from './linked-list'

// 双向链表
export default class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | undefined
  protected tail: DoublyNode<T> | undefined

  constructor(equalsFun: IEqualsFunction<T> = defaultEquals) {
    super(equalsFun)
  }

  /**
   * @description 向链表尾部添加一个新元素
   * @function push
   * @param element 插入的元素
   */
  push(element: T) {
    const newNode = new DoublyNode<T>(element)

    if (!this.head) {
      // 如果头节点无值，则添加
      this.head = newNode
      this.tail = newNode
    } else {
      if (this.tail) {
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
      }
    }
    this.count++
  }

  /**
   * @description 向链表的特定位置插入一个新元素
   * @function insert
   * @param element 插入的元素
   * @param index 插入索引值
   * @returns
   */
  insert(element: T, index: number) {
    if (index < 0 || index > this.count) {
      return false
    }

    const newNode = new DoublyNode<T>(element)
    let currentNode = this.head

    // 在起点插入元素
    if (index === 0) {
      // 头节点为空
      if (this.head == null) {
        this.head = newNode
        this.tail = newNode
      } else {
        // 头结点不为空
        newNode.next = this.head
        this.head.prev = newNode
        this.head = newNode
      }
      // 在最后一个节点插入
    } else if (index === this.count && this.tail) {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    } else {
      const previousNode = this.getElementAt(index - 1)

      currentNode = previousNode?.next
      newNode.next = currentNode
      if (previousNode && currentNode) {
        previousNode.next = newNode
        currentNode.prev = newNode
      }

      newNode.prev = previousNode
    }
    this.count++
    return true
  }

  /**
   * @description 返回元素在链表中的索引
   * @function indexOf
   * @param element
   * @returns
   */
  indexOf(element: T) {
    let currentNode = this.head
    let index = 0

    while (currentNode) {
      if (this.equalsFun(currentNode.element, element)) {
        return index
      }
      index++
      currentNode = currentNode.next
    }

    return -1
  }

  /**
   * @description 从链表的特定位置移除一个元素
   * @function removeAt
   * @param index 移除元素的索引值
   * @returns
   */
  removeAt(index: number) {
    if (index < 0 || index > this.count) {
      return undefined
    }

    let currentNode = this.head
    if (index === 0) {
      this.head = this.head?.next
      if (this.count === 1) {
        this.tail = undefined
      } else if (this.head) {
        this.head.prev = undefined
      }
    } else if (index === this.count - 1 && this.tail?.prev) {
      this.tail = this.tail?.prev
      this.tail.next = undefined
    } else {
      currentNode = this.getElementAt(index - 1)
      const previousNode = currentNode?.prev
      if (previousNode && currentNode?.next?.prev) {
        previousNode.next = currentNode?.next
        currentNode.next.prev = previousNode
      }
    }
    this.count--
    return currentNode?.element
  }

  /**
   * @description 返回链表尾部
   * @function getTail
   * @returns
   */
  getTail() {
    return this.tail
  }

  /**
   * @description 清空链表
   * @function clear
   * @returns
   */
  clear() {
    super.clear()
    this.tail = undefined
  }
}
