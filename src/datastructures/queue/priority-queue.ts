import QueueArray from './/queue-array'

class QueueElement<T> {
  public element: T
  public priority: number // 数字越少优先级越高

  constructor(element: T, priority: number) {
    this.element = element
    this.priority = priority
  }
}

// 优先级队列
export default class PriorityQueue<T> extends QueueArray<T> {
  _enqueue(element: T, priority: number): void {
    // super()
    const queueElement = new QueueElement<T>(element, priority)

    if (this.isEmpty()) {
      this.items.push(queueElement)
    } else {
      let added = false
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > queueElement.priority) {
          this.items.splice(i, 0, queueElement)
          added = true
          break
        }
      }

      if (!added) {
        this.items.push(queueElement)
      }
    }
  }
}
