import { defaultToString } from '../../utils/utils'
import { ValuePair } from './models/value-pair'

import LinkedList from '../linked-list/linked-list'

// 哈希表，使用链地址法
export default class HashTableSeparateChaining<K, V> {
  protected table: { [key: string]: LinkedList<ValuePair<K, V>> }
  protected toStringFn: (key: K) => string

  constructor(toStringFn: (key: K) => string = defaultToString) {
    this.table = {}
    this.toStringFn = toStringFn
  }

  /**
   * @description 哈希函数（根据键值生成对应哈希表下标）
   * @function loseloseHashCode
   * @param key 键值
   * @returns
   */
  private loseloseHashCode(key: K) {
    if (typeof key === 'number') {
      return key
    }
    const tableKey = this.toStringFn(key)
    let hashCode = 0
    for (let i = 0; i < tableKey.length; i++) {
      hashCode += tableKey.charCodeAt(i)
    }
    return hashCode % 37
  }

  /**
   * @description 向哈希表中添加元素
   * @function put
   * @param key 键值
   * @param value 数据项
   * @returns
   */
  put(key: K, value: V) {
    if (key == null || value == null) {
      return false
    }

    const index = this.loseloseHashCode(key)

    // 判断哈希表当前下标是否为空
    if (this.table[index] == null) {
      // 如果为空，则创建新的链表
      this.table[index] = new LinkedList<ValuePair<K, V>>()
    }
    // 把键值对插入值哈希表对应下标的链表中
    this.table[index].push(new ValuePair(key, value))
    return true
  }

  /**
   * @description 根据键值获取哈希表中的元素
   * @function get
   * @param key 键值
   * @returns
   */
  get(key: K) {
    const index = this.loseloseHashCode(key)
    const linkedList = this.table[index]
    if (linkedList != null && !linkedList.isEmpty()) {
      let currentNode = linkedList.getHead()
      // 遍历链表
      while (currentNode != null) {
        if (currentNode.element.key === key) {
          return currentNode.element.value
        }
        currentNode = currentNode.next
      }
    }

    return undefined
  }

  /**
   * @description 根据键值移除哈希表中的元素
   * @function remove
   * @param key 键值
   * @returns
   */
  remove(key: K) {
    const index = this.loseloseHashCode(key)
    const linkedList = this.table[index]
    if (linkedList != null && !linkedList.isEmpty()) {
      let currentNode = linkedList.getHead()
      // 遍历链表
      while (currentNode != null) {
        if (currentNode.element.key === key) {
          // 调用链表删除元素方法
          linkedList.remove(currentNode.element)
          // 删除元素后，如果链表为空，则在哈希表中删除对该链表引用
          if (linkedList.isEmpty()) {
            delete this.table[index]
          }
          return true
        }
        currentNode = currentNode.next
      }
    }

    return false
  }

  /**
   * @description 获取哈希表
   * @function getTable
   * @returns
   */
  getTable() {
    return this.table
  }

  /**
   * @description 获取哈希表是否为空
   * @function isEmpty
   * @returns
   */
  isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * @description 获取哈希表数据个数
   * @function size
   * @returns
   */
  size(): number {
    const count = Object.values(this.table).reduce(
      (prev, linkedList) => prev + linkedList.size(),
      0
    )

    return count
  }

  /**
   * @description 清空哈希表
   * @function clear
   */
  clear() {
    this.table = {}
  }

  /**
   * @description 普通哈希表遍历
   * @returns
   */
  [Symbol.iterator]() {
    let index = 0
    const keyList = Object.keys(this.table)
    let currentNodeFlag: any = null

    return {
      next: (): MyIterator<K, V> => {
        let currentValue: any = null

        let linkedList = this.table[keyList[index]]

        while (index < this.size()) {
          if (linkedList != null && !linkedList.isEmpty()) {
            let currentNode =
              currentNodeFlag == null ? linkedList.getHead() : currentNodeFlag

            if (currentNode != null) {
              currentValue = currentNode.element
              currentNodeFlag = currentNode.next
              if (currentNodeFlag == null) {
                index++
                linkedList = this.table[keyList[index]]
              }
              break
            }
          } else {
            index++
          }
        }

        if (index < this.size()) {
          return { done: false, value: currentValue }
        } else {
          return { done: true, value: currentValue }
        }
      }
    }
  }
}

interface MyIterator<K, V> {
  done: boolean
  value: any
}
