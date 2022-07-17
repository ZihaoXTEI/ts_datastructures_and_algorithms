import { defaultToString } from '../../utils/utils'
import { ValuePairLazy } from './models/value-pair'

export default class HashTableLinearProbingLazy<K, V> {
  protected table: { [key: string]: ValuePairLazy<K, V> }
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

    if (
      this.table[index] == null ||
      (this.table[index] != null && this.table[index].isDeleted)
    ) {
      this.table[index] = new ValuePairLazy(key, value)
    } else {
      index++
      while (this.table[index] != null && !this.table[index].isDeleted) {
        index++
      }

      this.table[index] = new ValuePairLazy(key, value)
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

    if (this.table[index] != null) {
      if (this.table[index].key === key && !this.table[index].isDeleted) {
        return this.table[index].value
      }

      index++
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        if (this.table[index].key === key && this.table[index].isDeleted) {
          return undefined
        }
        index++
      }

      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
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
      if (this.table[index].key === key && !this.table[index].isDeleted) {
        this.table[index].isDeleted = true
        return true
      }

      index++
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        index++
      }

      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        this.table[index].isDeleted = true
        return true
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
  isEmpty() {
    return this.size() === 0
  }

  /**
   * @description 获取哈希表数据个数
   * @function size
   * @returns
   */
  size() {
    const count = Object.values(this.table).reduce(
      (prev, valuePair) => prev + (valuePair.isDeleted === true ? 0 : 1),
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
   * @description 哈希表遍历
   * @returns
   */
  [Symbol.iterator]() {
    let index = 0
    const keyList = Object.keys(this.table)
    return {
      next: (): MyIterator<K, V> => {
        // 对于 isDeleted === true 应该 不显示
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
  value: ValuePairLazy<K, V>
}
