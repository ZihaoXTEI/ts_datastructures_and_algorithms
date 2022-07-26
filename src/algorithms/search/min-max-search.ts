import { Compare, defaultCompare } from '../../utils/utils'

// 搜索数组最大值
export function findMaxValue<T>(array: T[], compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let max = array[0]
    for (let i = 0; i < array.length; i++) {
      if (compareFn(max, array[i]) === Compare.LESS_THAN) {
        max = array[i]
      }
    }
    return max
  }
  return undefined
}

// 搜索数组最小值
export function findMinValue<T>(array: T[], compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let min = array[0]
    for (let i = 0; i < array.length; i++) {
      if (compareFn(min, array[i]) === Compare.BIGGER_THAN) {
        min = array[i]
      }
    }
    return min
  }
  return undefined
}
