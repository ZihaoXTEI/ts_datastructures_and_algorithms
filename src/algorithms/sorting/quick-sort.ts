import {
  Compare,
  defaultCompare,
  ICompareFunction,
  swap
} from '../../utils/utils'

// 快速排序
export const quickSort = <T>(array: T[], compareFn = defaultCompare) => {
  return quick(array, 0, array.length - 1, compareFn)
}

const quick = <T>(
  array: T[],
  left: number,
  right: number,
  compareFn: ICompareFunction<T>
) => {
  let index
  // 如果数组长度等于 1 直接返回
  if (array.length > 1) {
    index = partition(array, left, right, compareFn)

    // 根据 index 将子数组划分为较小值数组和较大值数组
    if (left < index - 1) {
      quick(array, left, index - 1, compareFn)
    }

    if (index < right) {
      quick(array, index, right, compareFn)
    }
  }

  return array
}

const partition = <T>(
  array: T[],
  left: number,
  right: number,
  compareFn: ICompareFunction<T>
) => {
  // 选择主元（使用数组中间值）
  const pivot = array[Math.floor((left + right) / 2)]
  let i = left
  let j = right

  // 当 left 指针 超过 right 指针时，结束循环
  while (i <= j) {
    // 如果 left 指针指向元素小于 主元，则向右移
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++
    }

    // 如果 right 指针指向元素大于 主元，则向左移
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--
    }

    // 如果 left 指针的元素比主元大，且 right 指针的元素比主元小
    // 并且 left 指针 没有超过 right 指针
    // 交换两个元素
    if (i <= j) {
      swap(array, i, j)
      // 继续移动两个指针
      i++
      j--
    }
  }
  return i
}
