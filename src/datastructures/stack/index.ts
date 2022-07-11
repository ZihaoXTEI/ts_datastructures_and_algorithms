import { StackArray } from './stack-array'

console.log('===================栈结构===================')

const stackArray = new StackArray<string>()

stackArray.push('apple')
stackArray.push('orange')
stackArray.push('peach')

for (const item of stackArray) {
	console.log(item)
}

export const X = 25
