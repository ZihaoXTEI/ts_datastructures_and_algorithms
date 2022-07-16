/**
 * @description 哈希函数 根据传入的字符串和哈希表长度产生对应的索引值
 * @function hashFunction
 * @param str 被哈希化字符串
 * @param size 哈希表长度
 * @returns
 */

function hashFunction(str, size) {
  let hashCode = 0

  // 使用霍纳算法，计算 hashCode
  for (let i = 0; i < str.length; i++) {
    // charCodeAt() 取到对应的 Unicode 编码
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }

  // 取余
  return hashCode % size
}

// 质数（素数）：表示大于 1 的自然数中，只能被 1 和自身整除的数
/**
 * @description 判断一个数是否是质数
 * @function isPrime
 * @param {*} num
 * @returns
 */
function isPrime(num) {
  // 判断是否是整数，并且大于1
  if (typeof num !== 'number' || num % 1 !== 0 || num <= 0) {
    return false
  }

  // 取平方根
  const temp = parseInt(Math.sqrt(num))

  for (let i = 2; i <= temp; i++) {
    if (num % i === 0) {
      return false
    }
  }

  return true
}

console.log('1', isPrime(1))
console.log('2', isPrime(2))
console.log('3', isPrime(3))
console.log('4', isPrime(4))
console.log('5', isPrime(5))
console.log('8', isPrime(8))
console.log('9', isPrime(9))
