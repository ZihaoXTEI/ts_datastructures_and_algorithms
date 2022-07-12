import QueueArray from './queue-array'

/**
 * @description 击鼓传花实现
 * @function hotPotato
 * @param elementList 筛选数据
 * @param num 第 num 个淘汰数字
 * @returns
 */
export function hotPotato<T>(elementList: T[], num: number) {
  const queueArray = new QueueArray<T>()
  // 淘汰的数据
  const elementedList: T[] = []

  // 将所有数据加入队列中
  for (let i = 0; i < elementList.length; i++) {
    queueArray.enqueue(elementList[i])
  }

  while (queueArray.size() > 1) {
    for (let a = 0; a < num - 1; a++) {
      // 出队列后立即加入队列尾端
      queueArray.enqueue(queueArray.dequeue())
    }
    // 第 num 个 移除队列并加入淘汰数据中
    elementedList.push(queueArray.dequeue())
  }

  return {
    elementedList,
    winner: queueArray.dequeue()
  }
}
