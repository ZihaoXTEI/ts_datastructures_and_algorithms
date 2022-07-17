// 使用数组实现哈希表
class HashTableArray {
  constructor() {
    this.storage = [] // 存储数组
    this.count = 0 // 当前数据总数
    this.limit = 7 // hashtable 初始化时长度
  }

  // 哈希函数
  hashFunction(str, size) {
    let hashCode = 0

    // 使用霍纳算法，计算 hashCode
    for (let i = 0; i < str.length; i++) {
      // charCodeAt() 取到对应的 Unicode 编码
      hashCode = 37 * hashCode + str.charCodeAt(i)
    }

    // 取余
    return hashCode % size
  }

  // 插入与修改方法
  put(key, value) {
    // 根据 key 获取对应的 index
    const index = this.hashFunction(key, this.limit)

    // 根据 index 取出对应的 bucket
    let bucket = this.storage[index]

    // 判断 bucket 是否为空 , 如果不存在则创建 bucket 并放入对应的 storage 中
    if (bucket == null) {
      bucket = []
      this.storage[index] = bucket
    }

    // 判断是否修改数据
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      // 找到数据后进行修改，并退出函数
      if (tuple[0] == key) {
        tuple[1] = value
        return
      }
    }

    // 否则进行添加数据操作
    bucket.push([key, value])
    this.count += 1

    // 判断是否需要扩容操作
    if (this.count > this.limit * 0.75) {
      let newSize = this.getPrime(this.limit * 2)
      this.resize(this.limit * 2)
    }
  }

  // 获取方法
  get(key) {
    // 根据 key 获取对应的 index
    const index = this.hashFunction(key, this.limit)

    // 根据 index 获取对应的 bucket
    const bucket = this.storage[index]

    // 判断 bucket 是否为 null
    if (!bucket) return null

    // 存在 bucket 进行线性查找
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] == key) {
        return tuple[1]
      }
    }

    return null
  }

  // 删除方法
  remove(key) {
    // 根据 key 获取对应的 index
    const index = this.hashFunction(key, this.limit)

    // 根据 index 获取对应的 bucket
    const bucket = this.storage[index]

    // 判断 bucket 是否为 null
    if (!bucket) return null

    // 存在 bucket 进行线性查找
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] == key) {
        bucket.splice(i, i)
        this.count--

        // 缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.75) {
          let newPrime = this.getPrime(Math.floor(this.limit / 2))
          this.resize(newPrime)
        }

        return tuple[1]
      }
    }

    return null
  }

  // 哈希表扩容方法
  resize(newLimit) {
    // 保存当前存储数组
    let oldStorage = this.storage

    // 重置所有属性
    this.storage = []
    this.count = 0
    this.limit = newLimit

    // 遍历 oldStorage 中的所有 bucket
    for (let i = 0; i < oldStorage.length; i++) {
      // 取出对应的 bucket
      let bucket = oldStorage[i]

      if (!bucket) continue

      // 如果 bucket 中存在数据，则取出数据并重新插入
      for (let j = 0; j < bucket.length; j++) {
        let tuple = bucket[j]
        this.put(tuple[0], tuple[1])
      }
    }
  }

  // 判断哈希表是否为空
  isEmpty() {
    return this.count === 0
  }

  // 获取哈希表中元素的个数
  size() {
    return this.count
  }

  // 获取质数
  getPrime(num) {
    while (!this.isPrime(num)) {
      num++
    }
    return num
  }

  // 判断数字是否是质数
  isPrime(num) {
    // 判断是否是整数，并且大于1
    if (typeof num !== 'number' || num % 1 !== 0 || num <= 0) {
      return false
    }

    // 取平方根
    const temp = parseInt(Math.sqrt(num))

    for (let i = 2; i <= temp; i++) {
      if (num % i === 0) {
        return false
      }
    }

    return true
  }

  // 哈希表迭代器
  [Symbol.iterator]() {
    let storageIndex = 0
    let bucketIndex = 0
    return {
      next: () => {
        if (storageIndex < this.count) {
          if (bucketIndex >= this.storage[storageIndex].length) {
            storageIndex++
          }

          while (!this.storage[storageIndex]) {
            storageIndex++
            bucketIndex = 0
          }

          return {
            done: false,
            value: this.storage[storageIndex][bucketIndex++]
          }
        } else {
          return { done: true }
        }
      }
    }
  }
}

const hashTableArray = new HashTableArray()
hashTableArray.put('apple', '苹果🍎')
hashTableArray.put('orange', '橙子🍊')
hashTableArray.put('peach', '桃子🍑')
hashTableArray.put('grape', '葡萄🍇')
hashTableArray.put('watermelon', '西瓜🍉')

console.log('获取 orange 元素：', hashTableArray.get('orange'))
console.log('哈希表元素个数：', hashTableArray.size())
console.log('删除 grape 元素：', hashTableArray.remove('grape'))
hashTableArray.put('apple', '苹果🍎 × 2')

for (const fruit of hashTableArray) {
  console.log(fruit)
}
