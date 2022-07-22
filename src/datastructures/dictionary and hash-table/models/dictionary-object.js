export default class Dictionary {
  constructor() {
    this.items = {}
  }

  // 向字典添加新的元素
  set(key, value) {
    this.items[key] = value
  }

  // 判断字典中是否存在指定元素
  has(key) {
    return this.items.hasOwnProperty(key)
  }

  // 从字典中移除指定元素
  remove(key) {
    // 判断字典中是否存在该 key
    if (!this.has(key)) {
      return false
    }

    delete this.items[key]
    return true
  }

  // 从字典中获取指定元素
  get(key) {
    return this.has(key) ? this.items[key] : undefined
  }

  // 获取字典中所有的 键（key）
  keys() {
    return Object.keys(this.items)
  }

  // 获取字典中所有的 值（value）
  values() {
    return Object.values(this.items)
  }

  // 获取字典的大小
  size() {
    return Object.keys(this.items).length
  }

  // 清空字典
  clear() {
    this.items = {}
  }
}

// const dictionary = new Dictionary()
// dictionary.set('a', '研发局')
// dictionary.set('b', '仓库')
// dictionary.set('c', '加值商店')
// dictionary.set('d', '造船厂')

// console.log(dictionary.has('c'))
// dictionary.remove('d')

// const values = dictionary.values()
// values.forEach((item) => {
//   console.log(item)
// })
