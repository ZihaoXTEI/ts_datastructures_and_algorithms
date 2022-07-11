export class StackObject<T> {
  private count: number
  private items: any

  constructor() {
    this.count = 0
    this.items = {}
  }

  // 向栈添加元素
  push(element: T) {
    this.items[this.count] = element
    this.count++
  }

  // 从栈移除元素
  pop() {
    if (this.isEmpty()) {
      return undefined
    }

    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  // 查看栈顶元素
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }

  // 判断栈是否为空
  isEmpty() {
    return this.count === 0
  }

  // 获取栈的长度
  size() {
    return this.count
  }

  // 清空栈
  clear() {
    this.count = 0
    this.items = {}

    // 使用LIFO原则清空栈
    /*     while(!this.isEmpty()){
      this.pop()
    } */
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }

    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
