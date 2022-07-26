// import { bubbleSort } from './bubble-sort'
// import { selectionSort } from './selection-sort'
// import { mergeSort } from './merge-sort'
import { quickSort } from './quick-sort'
import { countingSort } from './counting-sort'

const array = [25, 13, 41, 11, 28, 69, 5, 77, 12, 56, 58, 32, 17, 11]
const littleArray = [2, 4, 5, 7]

// console.log('==========排序：冒泡排序==========')
// console.log(bubbleSort(array))

// console.log('==========排序：选择排序==========')
// console.log(selectionSort(array))

// console.log('==========排序：归并排序==========')
// console.log(mergeSort(array))

console.log('==========排序：快速排序==========')
console.log(quickSort(array))

console.log('==========排序：计数排序==========')
console.log(countingSort(littleArray))
