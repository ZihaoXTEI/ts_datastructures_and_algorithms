import { defaultToString } from '../../utils/utils'
import { ValuePair } from './models/value-pair'

// 字典（对象实现）
export default class Dictionary<K, V> {
  private table: { [key: string]: ValuePair<K, V> }
  private toStringFn: (key: K) => string

  constructor(toStringFn: (key: K) => string = defaultToString) {
    this.table = {}
    this.toStringFn = toStringFn
  }

  /**
   * @description 向字典中添加新元素
   * @function set
   * @param key 键值
   * @param value 数据值
   * @returns
   */
  set(key: K, value: V) {
    if (key != null && value != null) {
      const tableKey = this.toStringFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }

  /**
   * @description 通过键值从字典中移除键值对应的数据值
   * @function remove
   * @param key 键值
   * @returns
   */
  remove(key: K) {
    if (this.hasKey(key)) {
      delete this.table[this.toStringFn(key)]
      return true
    }
    return false
  }

  /**
   * @description 判断某个键值是否存在字典中
   * @function hasKey
   * @param key 键值
   * @returns
   */
  hasKey(key: K) {
    return this.table[this.toStringFn(key)] != null
  }

  /**
   * @description 通过键值从字典中获取对应数据值
   * @function get
   * @param key 键值
   * @returns
   */
  get(key: K) {
    const valuePair = this.table[this.toStringFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  /**
   * @description 获取字典中所以键名
   * @function keys
   * @returns
   */
  keys(): K[] {
    return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.key)
  }

  /**
   * @description 获取字典中所以数据值
   * @function values
   * @returns
   */
  values() {
    return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.value)
  }

  /**
   * @description 获取字典中所以键值对
   * @function keyValues
   * @returns
   */
  keyValues(): ValuePair<K, V>[] {
    return Object.values(this.table)
  }

  /**
   * @description 迭代字典中所以键值对
   * @function forEach
   * @param callbackFn 回调参数有两个参数：key 和 value ，回调函数返回 false 时 函数会中止
   * @returns
   */
  forEach(callbackFn: (key: K, value: V) => any) {
    const valuePair = this.keyValues()
    for (let i = 0; i < valuePair.length; i++) {
      const result = callbackFn(valuePair[i].key, valuePair[i].value)
      if (result === false) {
        return false
      }
    }
  }

  /**
   * @description 判断字典是否为空
   * @function isEmpty
   * @returns
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * @description 获取字典键值对个数
   * @function size
   * @returns
   */
  size() {
    return Object.keys(this.table).length
  }

  /**
   * @description 清空字典
   * @function
   */
  clear() {
    this.table = {}
  }

  /**
   * @description 字典遍历 从头 到 尾
   * @returns
   */
  [Symbol.iterator]() {
    let index = 0
    const keyValueArray = this.keyValues()
    return {
      next: (): MyIterator<K, V> => {
        if (index < this.size()) {
          return { done: false, value: keyValueArray[index++] }
        } else {
          return { done: true, value: keyValueArray[index] }
        }
      }
    }
  }
}

interface MyIterator<K, V> {
  done: boolean
  value: ValuePair<K, V>
}
