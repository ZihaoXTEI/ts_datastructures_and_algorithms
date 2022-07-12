import LinkedList from './linked-list'

console.log('==========链表结构 单链表==========')
const linkedList = new LinkedList<string>()
linkedList.push('侠盗猎车手')
linkedList.push('极品飞车')
linkedList.push('都市：天际线')
linkedList.push('纪元')
linkedList.insert('我的世界', 3)
for (const item of linkedList) {
  console.log(item)
}
console.log(linkedList.indexOf('侠盗猎车手'))
console.log('第五个元素：', linkedList.getElementAt(4)?.element)
linkedList.push('黑道圣徒')
linkedList.push('战舰世界')
linkedList.removeAt(5)
linkedList.update('极限竞速：地平线', 1)
console.log('-------')
for (const item of linkedList) {
  console.log(item)
}
linkedList.clear()
