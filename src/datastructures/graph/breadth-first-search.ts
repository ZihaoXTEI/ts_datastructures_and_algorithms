import Graph from './graph'
import QueueObject from '../queue/queue-object'

enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2
}

type vertexType = string | number

// 为了记录顶点是否被访问过，使用三种颜色来反映它们的状态
// 白色：表示该顶点还没被访问过
// 灰色：表示该顶点被访问过，但没有被探索过
// 黑色：表示该顶点被访问过，并且被完全探索过

/**
 * @description 初始化颜色
 * @function
 * @param vertexes
 * @returns
 */
const initializeColor = (vertexes: vertexType[]) => {
  const colors: any = {}
  vertexes.forEach((v) => {
    colors[v] = Colors.WHITE
  })

  return colors
}

/**
 * @description 广度优先搜索
 * @function breadthFirstSearch
 * @param graph 图
 * @param callback 回调函数
 * @returns
 */
export const breadthFirstSearch = (graph: Graph, callback: Function) => {
  const vertexes = graph.getVertices()
  const edgeList = graph.getEdgeList()
  const colors = initializeColor(vertexes)
  const queue = new QueueObject()
  queue.enqueue(vertexes)

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue()
    const edges = edgeList.get(vertex)
    colors[vertex] = Colors.GREY

    edges?.forEach((edge) => {
      if (colors[edge] === Colors.WHITE) {
        colors[edge] = Colors.GREY
        queue.enqueue(edge)
      }
    })

    colors[vertex] = Colors.BLACK
    if (callback) {
      callback(vertex)
    }
  }
}

/**
 * @description 广度优先搜索（优化）
 * @function BFS
 * @param graph 图
 * @param startVertex 开始顶点
 * @returns
 */
export const BFS = (graph: Graph, startVertex: vertexType) => {
  const vertexes = graph.getVertices()
  const edgeList = graph.getEdgeList()
  const colors = initializeColor(vertexes)
  const queue = new QueueObject()
  const distances: any = {}
  const predecessors: any = {}
  queue.enqueue(startVertex)

  vertexes.forEach((v) => {
    distances[v] = 0
    predecessors[v] = null
  })

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue()
    const edges = edgeList.get(vertex)
    colors[vertex] = Colors.GREY

    edges?.forEach((edge) => {
      if (colors[edge] === Colors.WHITE) {
        colors[edge] = Colors.GREY
        distances[edge] = distances[vertex] + 1
        predecessors[edge] = vertex
        queue.enqueue(edge)
      }
    })

    colors[vertex] = Colors.BLACK
  }

  return {
    distances,
    predecessors
  }
}
