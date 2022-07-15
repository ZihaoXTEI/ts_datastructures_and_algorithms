export default class Set<T> {
  private items: any

  constructor() {
    this.items = {}
  }

  /**
   * @description 从集合中添加一个元素
   * @function add
   * @param element
   * @returns
   */
  add(element: T) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }

  /**
   * @description 从集合中移除一个元素
   * @function delete
   * @param element
   * @returns
   */
  delete(element: T) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  /**
   * @description 检查某个元素是否在集合中
   * @function has
   * @param element
   * @returns
   */
  has(element: T) {
    // return element in this.items
    return this.items.hasOwnProperty(element)
  }

  /**
   * @description 移除集合中所有元素
   * @function clear
   */
  clear() {
    this.items = {}
  }

  /**
   * @description 返回集合所包含元素的数量
   * @function size
   * @returns
   */
  size() {
    return Object.keys(this.items).length
  }

  /**
   * @description 返回一个包含集合中所有元素的数组
   * @function values
   * @returns
   */
  values() {
    return Object.values(this.items)
  }

  /**
   * @description 根据传入的集合与当前集合形成并集
   * @function union
   * @param otherSet
   * @returns
   */
  union(otherSet: Set<T>) {
    const unionSet = new Set<T>()

    this.values().forEach((item) => unionSet.add(item as T))
    otherSet.values().forEach((item) => unionSet.add(item as T))

    return unionSet
  }

  /**
   * @description 根据传入的集合与当前集合形成交集
   * @function intersetion
   * @param otherSet
   * @returns
   */
  intersetion(otherSet: Set<T>) {
    const intersetionSet = new Set<T>()

    const size = this.size()
    const otherSize = otherSet.size()

    const biggerSet = size >= otherSize ? this.values() : otherSet.values()
    const smallerSet = size >= otherSize ? otherSet.values() : this.values()

    // 使用元素较少的集合进行遍历
    smallerSet.forEach((item) => {
      if (biggerSet.includes(item)) {
        intersetionSet.add(item as T)
      }
    })

    return intersetionSet
  }

  /**
   * @description 当前集合与传入的集合形成差集
   * @function difference
   * @param otherSet
   * @returns
   */
  difference(otherSet: Set<T>) {
    const differenceSet = new Set<T>()

    this.values().forEach((item) => {
      if (!otherSet.has(item as T)) {
        differenceSet.add(item as T)
      }
    })

    return differenceSet
  }

  /**
   * @description 判断当前集合是否是传入集合的子集
   * @function isSubsetOf
   * @param otherSet
   * @returns
   */
  isSubsetOf(otherSet: Set<T>) {
    // 判断当前集合是否比传入的集合大
    if (this.size() > otherSet.size()) {
      return false
    }

    let isSubset = true

    this.values().every((item) => {
      if (!otherSet.has(item as T)) {
        isSubset = false
        return false
      }
      return true
    })

    return isSubset
  }
}
