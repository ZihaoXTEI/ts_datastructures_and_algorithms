// 使用对象实现双端队列
export default class DoubleEndedQueue<T> {
  private count: number // 记录队列的大小
  private lowestCount: number // 当前第一个元素
  private items: any

  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * @description 向双端队列前端添加元素
   * @function addFront
   * @param element 插入元素
   */
  addFront(element: T) {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.items[0] = element
    }
  }

  /**
   * @description 向双端队列后端添加元素
   * @function addBack
   * @param element 插入元素
   */
  addBack(element: T) {
    this.items[this.count] = element
    this.count++
  }

  /**
   * @description 从双端队列前端移除元素
   * @function removeFront
   * @returns
   */
  removeFront() {
    if (this.isEmpty()) {
      return undefined
    }

    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  /**
   * @description 从双端队列后端移除元素
   * @function removeBack
   * @returns
   */
  removeBack() {
    if (this.isEmpty()) {
      return undefined
    }

    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  /**
   * @description 查看双端队列前端第一个元素
   * @function peekFront
   * @returns
   */
  peekFront() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items[this.lowestCount]
  }

  /**
   * @description 查看双端队列后端第一个元素
   * @function peekBack
   * @returns
   */
  peekBack() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items[this.count - 1]
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
    return this.count - this.lowestCount
  }

  /**
   * @description 清空队列
   * @function clear
   */
  clear() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * @description 根据 先进先出 原则遍历
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
