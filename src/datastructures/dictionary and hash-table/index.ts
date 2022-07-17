import Dictionary from './dictionary'
import HashTable from './hash-table'
import HashTableSeparateChaining from './hash-table-separate-chaining'
import HashTableLinearProbing from './hash-table-linear-probing'
import HashTableLinearProbingLazy from './hash-table-linear-probing-lazy'

console.log('==========字典结构==========')
const dictionary = new Dictionary<string, string>()
dictionary.set('rule', '尺子📏')
dictionary.set('pen', '钢笔✒')
dictionary.set('pencil', '铅笔✏')
dictionary.set('paper-clip', '回形针📎')
for (const { key, value } of dictionary) {
  console.log(key, value)
}
dictionary.clear()

console.log('==========哈希表结构 普通哈希表（未解决冲突问题）==========')
const hashTable = new HashTable<string, string>()
hashTable.put('Hamburgers', '汉堡包')
hashTable.put('French fries', '薯条')
hashTable.put('Hot dog', '热狗')
console.log('我要 French fries:', hashTable.get('French fries'))
for (const { key, value } of hashTable) {
  console.log(`${key}: ${value}`)
}
hashTable.clear()

console.log('==========哈希表结构 使用链地址法==========')
const hashTableSeparateChaining = new HashTableSeparateChaining<
  string,
  string
>()
hashTableSeparateChaining.put('Ygritte', 'Ygritte@email.com')
hashTableSeparateChaining.put('Jonathan', 'Jonathan@email.com')
hashTableSeparateChaining.put('Jamie', 'Jamie@email.com')
hashTableSeparateChaining.put('Jack', 'Jack@email.com')
hashTableSeparateChaining.put('Jasmine', 'Jasmine@email.com')
hashTableSeparateChaining.put('Jake', 'Jake@email.com')
hashTableSeparateChaining.put('Nathan', 'Nathan@email.com')
hashTableSeparateChaining.put('Athelstan', 'Athelstan@email.com')
hashTableSeparateChaining.put('Sue', 'Sue@email.com')
hashTableSeparateChaining.put('Aethelwulf', 'Aethelwulf@email.com')
hashTableSeparateChaining.put('Sargeras', 'Sargeras@email.com')
console.log(hashTableSeparateChaining.size())
for (const { key, value } of hashTableSeparateChaining) {
  console.log(key, value)
}

console.log(
  '==========哈希表结构 使用线性探测（删除元素后需移动后边元素）=========='
)
const hashTableLinearProbing = new HashTableLinearProbing<string, string>()
hashTableLinearProbing.put('Ygritte', 'Ygritte@email.com')
hashTableLinearProbing.put('Jonathan', 'Jonathan@email.com')
hashTableLinearProbing.put('Jamie', 'Jamie@email.com')
hashTableLinearProbing.put('Jack', 'Jack@email.com')
hashTableLinearProbing.put('Jasmine', 'Jasmine@email.com')
hashTableLinearProbing.put('Jake', 'Jake@email.com')
hashTableLinearProbing.put('Nathan', 'Nathan@email.com')
hashTableLinearProbing.put('Athelstan', 'Athelstan@email.com')
hashTableLinearProbing.put('Sue', 'Sue@email.com')
hashTableLinearProbing.put('Aethelwulf', 'Aethelwulf@email.com')
hashTableLinearProbing.put('Sargeras', 'Sargeras@email.com')
console.log(hashTableLinearProbing.size())
for (const { key, value } of hashTableLinearProbing) {
  console.log(key, value)
}

console.log('==========哈希表结构 使用线性探测（软删除方式）==========')
const hashTableLinearProbingLazy = new HashTableLinearProbingLazy<
  string,
  string
>()
hashTableLinearProbingLazy.put('TypeScirpt', 'TypeScirpt编程')
hashTableLinearProbingLazy.put('JavaScirpt', 'JavaScirpt权威指南')
hashTableLinearProbingLazy.put('CSS', 'CSS权威指南')
hashTableLinearProbingLazy.put('HTTP', '图解HTTP')
hashTableLinearProbingLazy.put('HTTP', 'HTTP权威指南')
hashTableLinearProbingLazy.put('HTML', 'HTML权威指南')
hashTableLinearProbingLazy.remove('HTTP')
hashTableLinearProbingLazy.put('JavaScirpt', 'JavaScirpt高级程序设计')
console.log(
  '线性探测（软删除）-哈希表大小：',
  hashTableLinearProbingLazy.size()
)

console.log(hashTable.getTable())
for (const item of hashTableLinearProbingLazy) {
  console.log(item)
}
