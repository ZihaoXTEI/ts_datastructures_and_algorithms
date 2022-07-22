import Dictionary from '../../dictionary and hash-table/models/dictionary-object.js'

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
}

const graph = new Graph()

const vertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
vertexes.forEach((vertex) => {
  graph.addVertex(vertex)
})

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
