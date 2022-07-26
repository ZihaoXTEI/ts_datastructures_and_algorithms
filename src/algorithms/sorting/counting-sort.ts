import { findMaxValue } from '../search/min-max-search'

// 计数排序（只针对整数）
export function countingSort(array: number[]) {
  if (array.length < 2) {
    return array
  }

  const maxValue = findMaxValue(array) || 0
  // 生成一个 最大值+1 长度的数组
  const counts = new Array(maxValue + 1)
  let sortedIndex = 0

  // 迭代原始数组，并在 counts 数组中增加元素的计数值
  array.forEach((element) => {
    // 如果当前位置数组未定义，初始化为 0
    if (!counts[element]) {
      counts[element] = 0
    }
    // 在 counts 数组中的 array当前值的索引处 + 1
    // 表示当前位置存在元素和元素个数（同时解决了元素重复问题）
    counts[element]++
  })

  console.log('counts', counts)

  // 迭代 counts 数组
  counts.forEach((element, index) => {
    // 对于 counts 数组中存在值且值大于0的情况
    while (element > 0) {
      // 给 array 数组赋当且迭代的索引值
      array[sortedIndex++] = index
      // counts当前索引的元素 -1
      element--
    }
  })

  return array
}

// 对于给定数组:[2, 4, 5, 7]

// counts 数组初始化情况: 长度为 7 + 1 = 8
// [undefined, undefined, 1, undefined, 2, 1, undefined, 1]
