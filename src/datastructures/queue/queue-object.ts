export default class QueueObject<T> {
  private count: number // 记录队列的大小
  private lowestCount: number // 当前第一个元素
  private items: any

  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * @description: 向队列添加元素
   * @function enqueue
   * @param element 插入元素
   */
  enqueue(element: T) {
    this.items[this.count] = element
    this.count++
  }

  /**
   * @description: 从队列移除元素
   * @function dequeue
   * @returns
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined
    }

    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  /**
   * @description: 查看队列头元素
   * @function peek
   * @returns
   */
  peek() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items[this.lowestCount]
  }

  /**
   * @description: 检查队列是否为空
   * @function isEmpty
   * @returns
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * @description: 获取队列长度
   * @function size
   * @returns
   */
  size() {
    return this.count - this.lowestCount
  }

  /**
   * @description: 清空队列
   * @function clear
   */
  clear() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * @description: 根据 先进先出 原则遍历
   * @returns
   */
  [Symbol.iterator]() {
    let index = this.lowestCount
    return {
      next: () => {
        if (index < this.count) {
          return { done: false, value: this.items[index++] }
        } else {
          return { done: true }
        }
      }
    }
  }
}
