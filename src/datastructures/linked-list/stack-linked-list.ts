import DoublyLinkedList from './doubly-linked-list'

export default class StackLinkedList<T> {
  private items: DoublyLinkedList<T>

  constructor() {
    this.items = new DoublyLinkedList<T>()
  }

  /**
   * @description 向栈添加元素
   * @function push
   * @param {T} element
   */
  push(element: T) {
    // push 方法用于在数组的末端添加一个或多个元素
    this.items.push(element)
  }

  /**
   * @description 从栈移除元素
   * @function pop
   */
  pop() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.removeAt(this.size() - 1)
  }

  /**
   * @description 查看栈顶元素
   * @function peek
   */
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.getElementAt(this.size() - 1)?.element
  }

  /**
   * @description 判断栈是否为空
   * @function isEmpty
   */
  isEmpty() {
    return this.items.isEmpty()
  }

  /**
   * @description 获取栈的长度
   * @function size
   */
  size() {
    return this.items.size()
  }

  /**
   * @description 清空栈
   * @function clear
   */
  clear() {
    this.items.clear()
  }

  /**
   * @description 根据 后进先出 原则遍历
   * @returns
   */
  [Symbol.iterator]() {
    let index = this.items.size()
    return {
      next: () => {
        if (index >= 0) {
          return {
            done: false,
            value: this.items.getElementAt(index--)?.element
          }
        } else {
          return { done: true }
        }
      }
    }
  }
}
