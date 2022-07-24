const INF = Number.MAX_SAFE_INTEGER

const minKey = (graph: number[][], key: number[], visited: boolean[]) => {
  let min = INF
  let minIndex = 0

  for (let i = 0; i < graph.length; i++) {
    if (visited[i] === false && key[i] < min) {
      min = key[i]
      minIndex = i
    }
  }

  return minIndex
}

// Prim算法
// 求解 无权无向连通图 的最小生成树问题（MST）的贪心算法
export const prim = (graph: number[][]) => {
  const parent: number[] = []
  const key: number[] = []
  const visited: boolean[] = []
  const length = graph.length

  key[0] = 0
  parent[0] = -1
  for (let i = 1; i < length; i++) {
    key[i] = INF
    visited[i] = false
  }

  for (let i = 0; i < length; i++) {
    const shortestVertex = minKey(graph, key, visited)
    visited[shortestVertex] = true

    for (let j = 0; j < length; j++) {
      if (
        graph[shortestVertex][j] &&
        visited[j] === false &&
        graph[shortestVertex][j] < key[j]
      ) {
        parent[j] = shortestVertex
        key[j] = graph[shortestVertex][j]
      }
    }
  }

  return parent
}
