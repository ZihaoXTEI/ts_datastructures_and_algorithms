// 使用数组实现队列
export default class QueueArray {
  constructor() {
    this.items = []
  }

  /**
   * @description 向队列添加元素
   * @function enqueue
   * @param element 插入元素
   */
  enqueue(element) {
    this.items.push(element)
  }

  /**
   * @description 从队列移除元素
   * @function dequeue
   * @returns
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items.shift()
  }

  /**
   * @description 查看队列头元素
   * @function peek
   * @returns
   */
  peek() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items[0]
  }

  /**
   * @description 检查队列是否为空
   * @function isEmpty
   * @returns
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * @description 获取队列长度
   * @function size
   * @returns
   */
  size() {
    return this.items.length
  }

  /**
   * @description 清空队列
   * @function clear
   */
  clear() {
    this.items = []
  }

  /**
   * @description 根据 先进先出 原则遍历
   * @returns
   */
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.items.length) {
          return { done: false, value: this.items[index++] }
        } else {
          return { done: true }
        }
      }
    }
  }
}
