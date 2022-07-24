import Graph from './graph'
import QueueObject from '../queue/queue-object'
import StackArray from '../stack/stack-array'

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
 * @description 利用广度优先搜索寻找最短路径（一个顶点到另外一个顶点的最短路径）
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
  const distances: any = {} // 记录其它顶点至开始顶点的距离
  const predecessors: any = {} // 记录前溯结点

  queue.enqueue(startVertex)

  // 初始化
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
        // 通过 edge（指向当前顶点最近的一个顶点） + 1 来获取当前顶点与开始顶点的距离
        distances[edge] = distances[vertex] + 1
        // 记录当前顶点的前溯顶点
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

/**
 * @description 格式化输出最短路径
 * @function formatShortestPath
 * @param garph 图
 * @param startVertex 开始顶点
 */
export const formatShortestPath = (garph: Graph, startVertex: vertexType) => {
  const predecessors = BFS(garph, startVertex).predecessors

  const vertexes = garph.getVertices()
  let resultString = ''

  // 依次遍历每个顶点
  for (let i = 0; i < vertexes.length; i++) {
    const toVertex = vertexes[i]
    // 使用栈结构记录路径值，最后通过出栈来获取路径
    const path = new StackArray()

    if (toVertex === startVertex) continue
    // 依次遍历当前顶点的前溯顶点，将其入栈，直至遇到开始顶点
    for (let v = toVertex; v !== startVertex; v = predecessors[v]) {
      path.push(v)
    }
    // 将开始顶点入栈
    path.push(startVertex)

    // 通过出栈操作，输出路径格式： A - B - E
    let s = path.pop()
    while (!path.isEmpty()) {
      s += ` - ${path.pop()}`
    }

    resultString += s + '\n'
  }
  return resultString
}
