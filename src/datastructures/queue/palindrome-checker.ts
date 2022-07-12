import DoubleEndedQueue from './double-ended-queue'

/**
 * @description 回文检测器
 * @function palindromeChecker
 * @param alphaString 待检查字符串
 * @returns
 */
export function palindromeChecker(alphaString: string) {
  if (
    alphaString === undefined ||
    alphaString === null ||
    alphaString.length === 0
  ) {
    return false
  }

  const doubleEndedQueue = new DoubleEndedQueue<string>()
  const lowerString = alphaString.toLocaleLowerCase().split(' ').join('')
  console.log(lowerString)
  let isEqual = true
  let firstChart: string, lastChart: string

  for (let i = 0; i < lowerString.length; i++) {
    doubleEndedQueue.addBack(lowerString[i])
  }

  while (doubleEndedQueue.size() > 1 && isEqual) {
    firstChart = doubleEndedQueue.removeFront()
    lastChart = doubleEndedQueue.removeBack()
    isEqual = firstChart === lastChart
  }

  return isEqual
}
