import { Compare, defaultCompare } from '../../utils/utils'

// 选择排序
export function insertionSort(array: any[], compareFn = defaultCompare) {
  const { length } = array
  let temp

  for (let i = 1; i < length; i++) {
    let j = i
    temp = array[i]
    // 第 i 项与前面的进行比较，如果比前面的小则替换位置
    // array[j-1] > temp
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }

  return array
}
