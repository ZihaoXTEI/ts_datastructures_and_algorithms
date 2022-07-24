class ArrayList {
  constructor() {
    this.array = []
  }

  insert(item) {
    this.array.push(item)
  }

  toString() {
    return this.array.join('-')
  }

  // 交换数据
  swap(a, b) {
    const temp = this.array[a]
    this.array[a] = this.array[b]
    this.array[b] = temp
  }

  // 冒泡排序
  bubbleSort() {
    let { length } = this.array

    for (let i = length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        // 如果 j 比 j+1 大，则交换
        if (this.array[j] > this.array[j + 1]) {
          this.swap(j, j + 1)
        }
      }
    }
  }

  // 选择排序
  selectionSort() {
    let { length } = this.array

    for (let i = 0; i < length - 1; i++) {
      // 从 i+1 开始，和后面元素进行比较
      let min = i
      for (let j = min + 1; j < length; j++) {
        // 如果 i 位置的元素大于 j 位置的元素，则记录较小的位置
        if (this.array[min] > this.array[j]) {
          min = j
        }
      }
      // 交换 min 和 i 位置元素
      this.swap(min, i)
    }
  }

  // 插入排序
  insertionSort() {
    let { length } = this.array
    let temp, j

    for (let i = 1; i < length; i++) {
      temp = this.array[i]
      j = i
      while (j > 0 && this.array[j - 1] > temp) {
        this.array[j] = this.array[j - 1]
        j--
      }
      this.array[j] = temp
    }
  }
}

const arrayList = new ArrayList()
arrayList.insert(25)
arrayList.insert(23)
arrayList.insert(48)
arrayList.insert(32)
arrayList.insert(85)
arrayList.insert(2)
console.log('原始数组：', arrayList.toString())

// arrayList.bubbleSort()
// console.log('冒泡排序：', arrayList.toString())

// arrayList.selectionSort()
// console.log('选择排序：', arrayList.toString())

// arrayList.insertionSort()
// console.log('插入排序：', arrayList.toString())
