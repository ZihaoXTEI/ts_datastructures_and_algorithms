import { defaultToString } from '../../utils/utils'
import { ValuePair } from './models/value-pair'

// 普通哈希表（未解决冲突问题）
export default class HashTable<K, V> {
  protected table: { [key: string]: ValuePair<K, V> }
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
   * @param value
   * @returns
   */
  put(key: K, value: V) {
    if (key == null || value == null) {
      return false
    }

    const index = this.loseloseHashCode(key)
    this.table[index] = new ValuePair(key, value)
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
    const valuePair = this.table[index]
    return valuePair == null ? undefined : valuePair.value
  }

  /**
   * @description 根据键值移除哈希表中的元素
   * @function remove
   * @param key 键值
   * @returns
   */
  remove(key: K) {
    const index = this.loseloseHashCode(key)
    const valuePair = this.table[index]
    if (valuePair != null) {
      delete this.table[index]
      return true
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
  isEmpty() {
    return this.size() === 0
  }

  /**
   * @description 获取哈希表数据个数
   * @function size
   * @returns
   */
  size() {
    return Object.keys(this.table).length
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
    return {
      next: (): MyIterator<K, V> => {
        if (index < this.size()) {
          return { done: false, value: this.table[keyList[index++]] }
        } else {
          return { done: true, value: this.table[keyList[index]] }
        }
      }
    }
  }
}

interface MyIterator<K, V> {
  done: boolean
  value: ValuePair<K, V>
}
