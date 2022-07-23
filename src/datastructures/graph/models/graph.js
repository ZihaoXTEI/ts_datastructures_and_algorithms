import Dictionary from '../../dictionary and hash-table/models/dictionary-object.js'
import Queue from './queue.js'

class Graph {
  constructor() {
    this.vertexes = [] // 顶点
    this.edges = new Dictionary() // 边
  }

  // 向图中添加顶点
  addVertex(vertex) {
    this.vertexes.push(vertex)
    this.edges.set(vertex, [])
  }

  // 向图中添加边
  addEdge(vertex1, vertex2) {
    this.edges.get(vertex1).push(vertex2)
    this.edges.get(vertex2).push(vertex1)
  }

  // 从图中查找是否存在此顶点
  hasVertex(vertex) {
    return this.vertexes.includes(vertex)
  }

  toString() {
    let resultString = ''

    this.vertexes.forEach((vertex) => {
      const vEdges = this.edges.get(vertex).join(' ')
      resultString += `${vertex} --> ${vEdges} \n`
    })

    return resultString
  }

  // 为了记录顶点是否被访问过，使用三种颜色来反映它们的状态
  // 白色：表示该顶点还没被访问过
  // 灰色：表示该顶点被访问过，但没有被探索过
  // 黑色：表示该顶点被访问过，并且被完全探索过
  initializeColor() {
    const colors = []
    this.vertexes.forEach((vertex) => {
      colors[vertex] = 'white'
    })

    return colors
  }

  // 广度优先搜索
  bfs(initVertex, handler) {
    // 初始化颜色
    const colors = this.initializeColor()
    // 初始化队列
    const queue = new Queue()

    // 将顶点加入至队列中
    queue.enqueue(initVertex)
    while (!queue.isEmpty()) {
      let vertex = queue.dequeue()

      // 获取和顶点相连的其它顶点
      const vertexList = this.edges.get(vertex)

      // 将当前 vertex 颜色设置为灰色
      colors[vertex] = 'gray'

      vertexList.forEach((v) => {
        let otherEdge = v
        if (colors[otherEdge] == 'white') {
          colors[otherEdge] = 'gray'
          queue.enqueue(otherEdge)
        }
      })

      // 访问顶点
      handler(vertex)

      // 将顶点设置为黑色
      colors[vertex] = 'black'
    }
  }

  // 深度优先搜索
  dfs(initVertex, handler) {
    // 初始化颜色
    const colors = this.initializeColor()

    this._dfsVisit(initVertex, colors, handler)
  }

  _dfsVisit(vertex, colors, handler) {
    // 将颜色设置为灰色
    colors[vertex] = 'gray'

    // 处理当前顶点
    handler(vertex)

    // 访问当前顶点的相连顶点
    const vertexList = this.edges.get(vertex)
    vertexList.forEach((v) => {
      const otherEdge = v
      if (colors[otherEdge] == 'white') {
        this._dfsVisit(otherEdge, colors, handler)
      }
    })

    // 将当前顶点设置为黑色
    colors[vertex] = 'black'
  }
}

const graph = new Graph()

const vertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
vertexes.forEach((vertex) => {
  graph.addVertex(vertex)
})

//    H
//    |
//    |
//    D ---- A ---- B ---- E ---- I
//    |      |      |
//    |      |      |
//    G ---- C      F

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString())

let resultString = ''
const handle = (v) => {
  resultString += `${v} `
}

console.log('广度优先搜索：')
graph.bfs(graph.vertexes[0], handle)
console.log(resultString)

console.log('深度优先搜索：')
resultString = ''
graph.dfs(graph.vertexes[0], handle)
console.log(resultString)
