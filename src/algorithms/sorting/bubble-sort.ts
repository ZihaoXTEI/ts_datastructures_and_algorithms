import { Compare, defaultCompare, swap } from '../../utils/utils'

// 冒泡排序
export function bubbleSort<T>(array: T[], compareFn = defaultCompare) {
  const { length } = array

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}

// 冒泡排序（优化）
export function modifiedBubbleSort<T>(array: T[], compareFn = defaultCompare) {
  const { length } = array

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}
