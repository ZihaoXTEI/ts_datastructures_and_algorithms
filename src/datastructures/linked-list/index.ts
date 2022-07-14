import LinkedList from './linked-list'
import DoublyLinkedList from './doubly-linked-list'
import SortedLinkedList from './sorted-linked-list'
import CircularLinkedList from './circular-linked-list'

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

console.log('==========链表结构 双向链表==========')
const doublyLinkedList = new DoublyLinkedList<string>()
doublyLinkedList.push('A')
doublyLinkedList.push('B')
doublyLinkedList.push('C')
doublyLinkedList.insert('D', 2)
for (const item of doublyLinkedList) {
  console.log(item)
}
console.log(doublyLinkedList.indexOf('B'))
console.log('第四个元素：', doublyLinkedList.getElementAt(3)?.element)
doublyLinkedList.push('E')
doublyLinkedList.removeAt(0)
doublyLinkedList.update('Z', 1)
console.log('-------')
for (const item of doublyLinkedList) {
  console.log(item)
}
doublyLinkedList.clear()

console.log('==========链表结构 有序链表==========')
const sortedLinkedList = new SortedLinkedList<number>()
sortedLinkedList.push(3)
sortedLinkedList.push(5)
sortedLinkedList.push(1)

for (const item of sortedLinkedList) {
  console.log(item)
}

console.log('==========链表结构 单向循环链表==========')
const circularLinkedList = new CircularLinkedList<string>()
circularLinkedList.push('monkey')
circularLinkedList.push('cow')
circularLinkedList.push('goat')
circularLinkedList.insert('frog', 1)

for (const item of circularLinkedList) {
  console.log(item)
}
