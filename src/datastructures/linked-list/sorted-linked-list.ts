import { Node } from './models/node'
import LinkedList from './linked-list'

import {
  Compare,
  defaultCompare,
  defaultEquals,
  ICompareFunction,
  IEqualsFunction
} from '../../utils/utils'

export default class SortedLinkedList<T> extends LinkedList<T> {
  protected compareFn: ICompareFunction<T>

  constructor(
    equalsFun: IEqualsFunction<T> = defaultEquals,
    compareFn: ICompareFunction<T> = defaultCompare
  ) {
    super(equalsFun)
    this.compareFn = compareFn
  }

  /**
   * @description 向链表尾部添加一个新元素
   * @function push
   * @param element 插入的元素
   */
  push(element: T) {
    if (this.isEmpty()) {
      super.push(element)
    } else {
      const index = this.getIndexNextSortedElement(element)
      super.insert(element, index)
    }
  }

  /**
   * @description 向链表的特定位置插入一个新元素
   * @function insert
   * @param element 插入的元素
   * @param index 插入索引值
   * @returns
   */
  insert(element: T, index: number = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }
    index = this.getIndexNextSortedElement(element)
    return super.insert(element, index)
  }

  /**
   * @description 获取插入位置  新插入的元素添加至比它大的前面  （从小到大）
   * @param getIndexNextSortedElement
   * @returns
   */
  private getIndexNextSortedElement(element: T) {
    let currentNode = this.head
    let i = 0

    for (; i < this.count && currentNode; i++) {
      // a < b ? LESS : BIG
      const comp = this.compareFn(element, currentNode.element)
      if (comp === Compare.LESS_THAN) {
        return i
      }
      currentNode = currentNode.next
    }

    return i
  }
}
