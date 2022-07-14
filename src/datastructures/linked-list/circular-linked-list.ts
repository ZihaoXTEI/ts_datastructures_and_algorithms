import { Node } from './models/node'
import LinkedList from './linked-list'

import { IEqualsFunction, defaultEquals } from '../../utils/utils'

export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor(equalsFun: IEqualsFunction<T> = defaultEquals) {
    super(equalsFun)
  }

  /**
   * @description 向链表尾部添加一个新元素
   * @function push
   * @param element 插入的元素
   */
  push(element: T) {
    const newNode = new Node<T>(element)

    if (!this.head) {
      // 如果头节点无值，则添加
      this.head = newNode
    } else {
      const currentNode = this.getElementAt(this.count - 1)
      if (currentNode) {
        currentNode.next = newNode
      }
    }

    newNode.next = this.head
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

    const newNode = new Node<T>(element)
    let currentNode = this.head

    // 在起点插入元素
    if (index === 0) {
      // 头节点为空
      if (this.head == null) {
        this.head = newNode
        newNode.next = this.head
      } else {
        // 头结点不为空
        newNode.next = this.head
        currentNode = this.getElementAt(this.count)
        this.head = newNode
        if (currentNode) {
          currentNode.next = this.head
        }
      }
    } else {
      const previousNode = this.getElementAt(index - 1)
      newNode.next = previousNode?.next
      if (previousNode) {
        previousNode.next = newNode
      }
    }
    this.count++
    return true
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
      if (this.count === 1) {
        this.head = undefined
      } else {
        const removeNode = this.head
        currentNode = this.getElementAt(this.count - 1)
        this.head = this.head?.next
        if (currentNode) {
          currentNode.next = this.head
        }
        currentNode = removeNode
      }
    } else {
      const previousNode = this.getElementAt(index - 1)
      currentNode = previousNode?.next
      if (previousNode) {
        previousNode.next = currentNode?.next
      }
    }
    this.count--
    return currentNode?.element
  }
}
