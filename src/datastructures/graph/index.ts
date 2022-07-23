import Graph from './graph'
import { breadthFirstSearch } from './breadth-first-search'

console.log('==========图结构==========')
const graph = new Graph(false)
const vertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

vertexes.forEach((v) => {
  graph.addVertex(v)
})

//  图结构
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

console.log('普通遍历：')
console.log(graph.toString())

let resultString = ''
const handle = (v: any) => {
  resultString += `${v} `
}

console.log('广度优先搜索：')
breadthFirstSearch(graph, handle)
console.log(resultString)
