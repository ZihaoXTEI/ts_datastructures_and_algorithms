const INF = Number.MAX_SAFE_INTEGER

const minDistance = (dist: number[], visited: boolean[]) => {
  let min = INF
  let minIndex = -1

  for (let vertex = 0; vertex < dist.length; vertex++) {
    if (visited[vertex] === false && dist[vertex] <= min) {
      min = dist[vertex]
      minIndex = vertex
    }
  }

  return minIndex
}

// Dijkstra算法
// 计算单个源到所有其它源的最短路径的贪心算法
export const dijkstra = (graph: number[][], startVertex: number) => {
  const dist: number[] = []
  const visited: boolean[] = []
  const length = graph.length

  // 初始化
  for (let i = 0; i < length; i++) {
    dist[i] = INF
    visited[i] = false
  }

  dist[startVertex] = 0

  for (let i = 0; i < length - 1; i++) {
    const u = minDistance(dist, visited)

    visited[u] = true

    for (let j = 0; j < length; j++) {
      if (
        !visited[j] &&
        graph[u][j] !== 0 &&
        dist[u] !== INF &&
        dist[u] + graph[u][j] < dist[j]
      ) {
        dist[j] = dist[u] + graph[u][j]
      }
    }
  }

  toString(dist)
  return dist
}

const toString = (dist: number[]) => {
  console.log('顶点\t距离')
  for (let i = 0; i < dist.length; i++) {
    console.log(`${i}\t\t${dist[i]}`)
  }
}
