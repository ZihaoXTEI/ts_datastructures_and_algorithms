import Set from './set'

console.log('==========集合结构==========')
const set = new Set<string>()
set.add('中央处理器')
set.add('主板')
set.add('内存条')
set.add('电源')
set.add('内存条')
set.add('显示器')
const values = set.values()
values.forEach((item) => {
  console.log(item)
})
console.log(set.has('主板'))
set.delete('电源')
console.log(set.size())
set.clear()

console.log('==========集合结构 集合运算==========')
const setA = new Set<number>()
setA.add(1)
setA.add(2)
setA.add(3)
setA.add(4)
setA.add(5)

const setB = new Set<number>()
setB.add(4)
setB.add(5)

const unionSet = setA.union(setB)
console.log('集合A 与 集合B 的并集', unionSet.values())

const intersetionSet = setA.intersetion(setB)
console.log('集合A 与 集合B 的交集', intersetionSet.values())

const differenceSet = setA.difference(setB)
console.log('集合A 与 集合B 的差集', differenceSet.values())

const isSubset = setB.isSubsetOf(setA)
console.log('集合B 是 集合A 的子集', isSubset)
