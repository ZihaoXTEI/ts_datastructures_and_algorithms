import { Compare, defaultCompare, ICompareFunction } from '../../utils/utils'

export function mergeSort<T>(array: T[], compareFn = defaultCompare) {
  // 如果数组长度比 1 大，则划分成更小的数组
  if (array.length > 1) {
    const { length } = array
    // 根据中间索引值，将数组划分为左 右两个数组，直至数组长度等于 1
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle), compareFn)
    const right = mergeSort(array.slice(middle, length), compareFn)
    // 归并和排序小数组，直到原始数组合并并完成排序
    array = merge(left, right, compareFn)
  }

  return array
}

const merge = <T>(left: T[], right: T[], compareFn: ICompareFunction<T>) => {
  let i = 0
  let j = 0

  const result: T[] = []

  while (i < left.length && j < right.length) {
    if (compareFn(left[i], right[j]) === Compare.LESS_THAN) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }

  // 将剩余的项添加到归并数组中
  if (i < left.length) {
    return result.concat(left.slice(i))
  } else {
    return result.concat(right.slice(j))
  }
}
