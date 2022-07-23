import Dictionary from '../dictionary and hash-table/dictionary'

type vertexType = string | number

export default class Graph {
  private vertices: vertexType[] = []
  private edgeList: Dictionary<vertexType, vertexType[]> = new Dictionary()
  private isDirected = false // 设置图是否有向

  constructor(isDirected: boolean) {
    this.isDirected = isDirected
  }

  /**
   * @description 添加顶点至数组和创建对应邻接表的空数组
   * @function addVertex
   * @param vertex 顶点
   */
  addVertex(vertex: string | number) {
    // 只有顶点不在图中，才添加顶点至 数组 中
    if (!this.vertices.includes(vertex)) {
      this.vertices.push(vertex)
      // 在邻接表中，设置顶点作为键对应的字典值为一个数组
      this.edgeList.set(vertex, [])
    }
  }

  /**
   * @description 添加两个顶点（该两个顶点存在连接关系）
   * @function addEdge
   * @param vertex 第一个顶点
   * @param edge 第二个顶点
   */
  addEdge(vertex: vertexType, edge: vertexType) {
    // 验证两个顶点是否存在，如果不存在则添加至 顶点数组
    if (!this.edgeList.get(vertex)) {
      this.addVertex(vertex)
    }
    if (!this.edgeList.get(edge)) {
      this.addVertex(edge)
    }

    this.edgeList.get(vertex)?.push(edge)

    // 如果是无向图，则对应 边顶点 的邻接表也要加上该顶点
    if (!this.isDirected) {
      this.edgeList.get(edge)?.push(vertex)
    }
  }

  /**
   * @description 获取顶点数组
   * @function getVertices
   * @returns
   */
  getVertices() {
    return this.vertices
  }

  /**
   * @description 获取邻接表
   * @function getVertices
   * @returns
   */
  getEdgeList() {
    return this.edgeList
  }

  /**
   * @description 格式化输出图的连接内容
   * @function toString
   * @returns
   */
  toString() {
    let resultString = ''

    this.vertices.forEach((v) => {
      const edges = this.edgeList.get(v)?.join(' ')
      resultString += `${v} -> ${edges}\n`
    })

    return resultString
  }
}
