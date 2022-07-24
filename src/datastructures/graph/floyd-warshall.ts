// Floyd-Warshall算法
// 计算图中所有最短路径的动态规划算法，可以计算出所有源到所有顶点的最短路径
export const floydWarshall = (graph: number[][]) => {
  const { length } = graph
  const dist: number[][] = []
  // 初始化
  for (let i = 0; i < length; i++) {
    dist[i] = []
    for (let j = 0; j < length; j++) {
      if (i === j) {
        // dist[i][j] = 0
        dist[i].push(2)
        // isFinite() 判断被传入的参数值是否为一个有限数值
      } else if (!isFinite(graph[i][j])) {
        dist[i][j] = Infinity // 表示无穷大
      } else {
        // dist[i][j] = graph[i][j]
        console.log('-', graph[i][j])
        dist[i].push(graph[i][j])
      }
    }
  }
  console.log(dist)

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      for (let k = 0; k < length; k++) {
        if (dist[j][i] + dist[i][k] < dist[j][k]) {
          dist[j][k] = dist[j][i] + dist[i][k]
        }
      }
    }
  }

  toString(dist)

  return dist
}

const toString = (dist: number[][]) => {
  for (let i = 0; i < dist.length; i++) {
    let str = ''
    for (let j = 0; j < dist[i].length; j++) {
      str += !isFinite(dist[i][j]) ? 'INF' : dist[i][j]
    }
    console.log(str)
  }
}
