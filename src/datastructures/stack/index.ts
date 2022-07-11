import StackArray from './stack-array'

import { decimalToBinary, baseConverter } from './base-converter'

console.log('==========栈结构 数组实现==========')

const stackArray = new StackArray<string>()

// 压栈
stackArray.push('apple')
stackArray.push('orange')
stackArray.push('peach')
stackArray.push('grape')
// 出栈
stackArray.pop()
// 查看栈顶
console.log('当前栈顶元素：', stackArray.peek())
// 遍历栈
for (const item of stackArray) {
  console.log(item)
}

console.log('==========栈结构 十进制转二进制==========')
let num1 = 98
console.log(`${num1}的二进制：`, decimalToBinary(num1))

console.log('==========栈结构 十进制转任意进制==========')
let num2 = 17852365
console.log(`${num2}的二进制：`, baseConverter(num2, 2))
console.log(`${num2}的八进制：`, baseConverter(num2, 8))
console.log(`${num2}的十六进制：`, baseConverter(num2, 16))
// console.log(`${num2}的三十七进制：`, baseConverter(num2, 37))
