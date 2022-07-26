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

  // 希尔排序
  shellSort() {
    let { length } = this.array
    let temp, j
    // 初始化的增量
    let gap = Math.floor(length / 2)

    while (gap >= 1) {
      // 以 gap 作为间隔进行分组，对分组进行插入排序
      for (let i = gap; i < length; i++) {
        temp = this.array[i]
        j = i
        // 对分组进行插入排序
        while (j > gap - 1 && this.array[j - gap] > temp) {
          this.array[j] = this.array[j - gap]
          j -= gap
        }
        // 将 j 位置的元素赋值 temp
        this.array[j] = temp
      }

      // 重新计算间隔
      gap = Math.floor(gap / 2)
    }
  }

  // 快速排序
  quickSort() {
    this._quickSortRec(0, this.array.length - 1)
  }

  _quickSortRec(left, right) {
    // 结束条件
    if (left >= right) {
      return
    }

    // 获取枢纽
    let pivot = this._median(left, right)

    // 定义变量，记录当前找到位置
    let i = left
    let j = right - 1

    while (i < j) {
      while (this.array[++i] < pivot) {}
      while (this.array[--j] > pivot) {}
      if (i < j) {
        this.swap(i, j)
      } else {
        break
      }
    }

    this.swap(i, right - 1)

    // 分而治之
    this._quickSortRec(left, i - 1)
    this._quickSortRec(i + 1, right)
  }

  // 中位数操作
  _median(left, right) {
    // 取出中间位置
    let center = Math.floor((left + right) / 2)

    // 判断大小进行交换
    if (this.array[left] > this.array[center]) {
      this.swap(left, center)
    }
    if (this.array[center] > this.array[right]) {
      this.swap(center, right)
    }
    if (this.array[left] > this.array[center]) {
      this.swap(left, center)
    }

    // 将 center 移到 right-1 的位置
    this.swap(center, right - 1)

    return this.array[right - 1]
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

// arrayList.shellSort()
// console.log('希尔排序：', arrayList.toString())

arrayList.quickSort()
console.log('快速排序：', arrayList.toString())
