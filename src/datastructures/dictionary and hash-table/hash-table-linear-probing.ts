import { defaultToString } from '../../utils/utils'
import { ValuePair } from './models/value-pair'

export default class HashTableLinearProbing<K, V> {
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
   * @param value 数据项
   * @returns
   */
  put(key: K, value: V) {
    if (key == null || value == null) {
      return false
    }

    let index = this.loseloseHashCode(key)
    if (this.table[index] == null) {
      this.table[index] = new ValuePair(key, value)
    } else {
      index++
      while (this.table[index] != null) {
        index++
      }
      this.table[index] = new ValuePair(key, value)
    }
    return true
  }

  /**
   * @description 根据键值获取哈希表中的元素
   * @function get
   * @param key 键值
   * @returns
   */
  get(key: K) {
    let index = this.loseloseHashCode(key)

    if (this.table[index].key === key) {
      return this.table[index].value
    } else {
      index++
      while (this.table[index] != null && this.table[index].key !== key) {
        index++
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[index].value
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
    let index = this.loseloseHashCode(key)

    if (this.table[index] != null) {
      if (this.table[index].key === key) {
        delete this.table[index]
        // 移动后边元素
        this.verifyRemoveSideEffect(key, index)
        return true
      }
    }

    return false
  }

  /**
   * @description 移动被删除元素后边的元素至空位
   * @function verifyRemoveSideEffect
   * @param key 被删除元素的键值
   * @param removedPosition 被删除元素的在哈希表中的位置
   */
  private verifyRemoveSideEffect(key: K, removedPosition: number) {
    const hash = this.loseloseHashCode(key)

    let index = removedPosition + 1

    while (this.table[index] != null) {
      // 当前位置元素的 hash 值
      const positionHash = this.loseloseHashCode(this.table[index].key)
      // 如果当前元素的 hash 值 少于或等于 原始 hash 值，
      // 或者当前元素的 hash 值 小于或等于 上一个被移除元素（removedPosition）的 hash 值
      // 则需要将当前元素 移动 到 上一个被移除元素的位置（removedPosition）
      if (positionHash <= hash || positionHash <= removedPosition) {
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
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
   * @description 哈希表遍历
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
