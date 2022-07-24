import { Compare, defaultCompare, swap } from '../../utils/utils'

// 选择排序
export function selectionSort<T>(array: T[], compareFn = defaultCompare) {
  const { length } = array
  let indexMin

  for (let i = 0; i < length - 1; i++) {
    indexMin = i
    // 从 i 开始，寻找数组中最大值
    for (let j = i; j < length; j++) {
      // array[indexMin] > array[j]
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j
      }
    }

    // 如果寻找到的下标与当前记录下标不同，则交换
    if (indexMin !== i) {
      swap(array, i, indexMin)
    }
  }

  return array
}
