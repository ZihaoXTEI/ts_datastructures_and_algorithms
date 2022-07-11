import QueueObject from './queue-object'
import DoubleEndedQueue from './double-ended-queue'

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
