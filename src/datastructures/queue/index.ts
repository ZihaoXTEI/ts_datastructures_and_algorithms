import QueueObject from './queue-object'
import DoubleEndedQueue from './double-ended-queue'
import { hotPotato } from './hotpotato'
import { palindromeChecker } from './palindrome-checker'
import PriorityQueue from './priority-queue'

console.log('==========队列结构 对象实现==========')
const queueObject = new QueueObject<string>()
queueObject.enqueue('tomatoes')
queueObject.enqueue('potatoes')
queueObject.enqueue('broccoli')
queueObject.enqueue('onions')

for (const item of queueObject) {
  console.log(item)
}

queueObject.dequeue()
console.log('当前队列头部元素：', queueObject.peek())
queueObject.clear()

console.log('==========队列结构 双端队列==========')
const doubleEndedQueue = new DoubleEndedQueue<string>()
doubleEndedQueue.addFront('ASUS')
doubleEndedQueue.addFront('Dell')
doubleEndedQueue.addBack('HP')
doubleEndedQueue.addFront('Acer')
doubleEndedQueue.addBack('Apple')

for (const item of doubleEndedQueue) {
  console.log(item)
}

doubleEndedQueue.removeBack()
doubleEndedQueue.removeFront()
console.log('双端队列前端第一个元素：', doubleEndedQueue.peekFront())
console.log('双端队列后端第一个元素', doubleEndedQueue.peekBack())

console.log('==========击鼓传花==========')
const names = ['Lucy', 'Ben', 'Jobs', 'Bobs', 'Juily', 'Bill']
const result = hotPotato(names, 5)
result.elementedList.forEach((item) => {
  console.log(`${item}在击鼓传花游戏中淘汰`)
})
console.log(`击鼓传花游戏获胜者：${result.winner}`)

console.log('==========回文检测器==========')
console.log('level', palindromeChecker('level'))
console.log(
  'Was it a car or a cat I saw',
  palindromeChecker('Was it a car or a cat I saw')
)

console.log('==========优先级队列==========')
const priorityQueue = new PriorityQueue<string>()
priorityQueue._enqueue('piano', 25)
priorityQueue._enqueue('violin', 52)
priorityQueue._enqueue('flute', 18)
priorityQueue._enqueue('trumpet', 36)

for (const item of priorityQueue) {
  console.log(item)
}
