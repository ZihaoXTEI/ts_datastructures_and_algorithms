import Graph from './graph'

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
 * @description 深度优先搜索（递归方式）
 * @function depthFirstSearchVisit
 * @param vertex 顶点
 * @param colors 顶点颜色数组
 * @param edgeList 顶点对应邻接表
 * @param callback 回调函数
 */
const depthFirstSearchVisit = (
  vertex: vertexType,
  colors: any,
  edgeList: any,
  callback: Function
) => {
  colors[vertex] = Colors.GREY
  if (callback) {
    callback(vertex)
  }

  const edges = edgeList.get(vertex)
  edges.forEach((edge: vertexType) => {
    if (colors[edge] === Colors.WHITE) {
      depthFirstSearchVisit(edge, colors, edgeList, callback)
    }
  })

  colors[vertex] = Colors.BLACK
}

/**
 * @description 深度优先搜索（递归方式）
 * @function depthFirstSearch
 * @param graph 图
 * @param callback 回调函数
 */
export const depthFirstSearch = (graph: Graph, callback: Function) => {
  const vertexes = graph.getVertices()
  const edgeList = graph.getEdgeList()
  const colors = initializeColor(vertexes)

  vertexes.forEach((v) => {
    if (colors[v] === Colors.WHITE) {
      depthFirstSearchVisit(v, colors, edgeList, callback)
    }
  })
}

const DFSVisit = (
  vertex: vertexType,
  colors: any,
  discovery: any,
  finished: any,
  predecessors: any,
  time: number,
  edgeList: any
) => {
  colors[vertex] = Colors.GREY
  discovery[vertex] = ++time
  const edges = edgeList.get(vertex)
  edges.forEach((edge: vertexType) => {
    if (colors[edge] === Colors.WHITE) {
      predecessors[edge] = vertex
      DFSVisit(edge, colors, discovery, finished, predecessors, time, edgeList)
    }
  })

  colors[vertex] = Colors.BLACK
  finished[vertex] = ++time
}

export const DFS = (graph: Graph) => {
  const vertexes = graph.getVertices()
  const edgeList = graph.getEdgeList()
  const colors = initializeColor(vertexes)
  const discovery: any = {}
  const finished: any = {}
  const predecessors: any = {}
  const time = 0

  vertexes.forEach((v) => {
    if (colors[v] === Colors.WHITE) {
      DFSVisit(v, colors, discovery, finished, predecessors, time, edgeList)
    }
  })

  return {
    discovery,
    finished,
    predecessors
  }
}
