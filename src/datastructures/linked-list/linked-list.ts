import { Node } from './models/node'
import { IEqualsFunction, defaultEquals } from '../../utils/utils'

// 单向链表
export default class LinkedList<T> {
  protected count: number // 链表数据总数
  protected head: Node<T> | undefined
  protected equalsFun: IEqualsFunction<T>

  constructor(equalsFun: IEqualsFunction<T> = defaultEquals) {
    this.count = 0
    this.head = undefined
    this.equalsFun = equalsFun
  }

  /**
   * @description 向链表尾部添加一个新元素
   * @function push
   * @param element 插入的元素
   */
  push(element: T) {
    const newNode = new Node<T>(element)

    if (!this.head) {
      // 如果头节点无值，则指向添加
      this.head = newNode
    } else {
      let current = this.head
      // 获取链表最后一个元素
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.count++
  }

  /**
   * @description 向链表的特点位置插入一个新元素
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

    if (index === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      const previous = this.getElementAt(index - 1)
      newNode.next = previous?.next
      if (previous) {
        previous.next = newNode
      }
    }
    this.count++
    return true
  }

  /**
   * @description 向链表的特点位置更新元素
   * @function update
   * @param element 待更新元素的数据
   * @param index  待更新元素的索引值
   * @returns
   */
  update(element: T, index: number) {
    if (index < 0 || index > this.count) {
      return false
    }

    // 方式一：直接在原有节点替换数据
    /*     const node = this.getElementAt(index)
    if (node) {
      node.element = element
    }
    return true
 */
    // 方式二：删除原先节点，重新插入
    const result = this.removeAt(index)
    if (result) {
      return this.insert(element, index)
    }
    return result
  }

  /**
   * @description 返回链表中特定位置的元素
   * @function getElementAt
   * @param index 目标索引值
   * @returns
   */
  getElementAt(index: number) {
    if (index < 0 || index > this.count) {
      return undefined
    }

    let currentNode = this.head

    for (let i = 0; i < index && currentNode != null; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  /**
   * @description 返回元素在链表中的索引
   * @function indexOf
   * @param element
   * @returns
   */
  indexOf(element: T) {
    let current = this.head
    let index = 0

    while (current) {
      if (this.equalsFun(current.element, element)) {
        return index
      }
      index++
      current = current.next
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

    let current = this.head
    if (index === 0) {
      this.head = current?.next
    } else {
      const previous = this.getElementAt(index - 1)
      current = previous?.next
      if (previous) {
        previous.next = current?.next
      }
    }
    this.count--
    return current?.element
  }

  /**
   * @description 从链表中移除一个元素
   * @function remove
   * @param element 待移除的元素
   * @returns
   */
  remove(element: T) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  /**
   * @description 判断链表是否为空
   * @function isEmpty
   * @returns
   */
  isEmpty() {
    return this.count === 0
  }

  /**
   * @description 返回链表包含元素的个数
   * @function size
   * @returns
   */
  size() {
    return this.count
  }

  /**
   * @description 返回链表头部
   * @function getHead
   * @returns
   */
  getHead() {
    return this.head
  }

  /**
   * @description 清空链表
   * @function clear
   * @returns
   */
  clear() {
    this.head = undefined
    this.count = 0
  }

  /**
   * @description 链表遍历 从头 到 尾
   * @returns
   */
  [Symbol.iterator]() {
    let index = 0
    let currentNode = this.head
    return {
      next: () => {
        if (index < this.count && currentNode) {
          const element = currentNode.element
          currentNode = currentNode.next
          index++
          return { done: false, value: element }
        } else {
          return { done: true }
        }
      }
    }
  }
}
