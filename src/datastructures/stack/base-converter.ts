import StackArray from './stack-array'

/**
 * @description: 十进制转二进制算法
 * @function decimalToBinary
 * @param decNumber 被转换数
 * @returns
 */
export function decimalToBinary(decNumber: number) {
  const remStack = new StackArray<number>()

  let remainder: number
  let binaryString = ''

  // 循环取余数
  while (decNumber > 0) {
    remainder = Math.floor(decNumber % 2)
    remStack.push(remainder)
    decNumber = Math.floor(decNumber / 2)
  }

  /*   for (const item of remStack) {
    binaryString += item?.toString()
  } */

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop()?.toString()
  }

  return binaryString
}

/**
 * @description: 任意进制转换算法
 * @function baseConverter
 * @param decNumber 被转换数
 * @param base 基数
 * @returns
 */
export function baseConverter(decNumber: number, base: number) {
  const remStack = new StackArray<number>()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let remainder: number
  let baseString = ''

  if (base < 2 || base > 36) {
    throw new RangeError('请输入正确转换的进制数：2至36')
  }

  while (decNumber > 0) {
    remainder = Math.floor(decNumber % base)
    remStack.push(remainder)
    decNumber = Math.floor(decNumber / base)
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop() as number]
  }

  return baseString
}
