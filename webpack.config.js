const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/main.ts',
  // 打包输出路径
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  mode: 'development',
  // watch: true,
  devServer: {
    hot: true,
    port: 7979,
    open: true,
    client: {
      // 允许在浏览器中设置日志级别
      logging: 'error'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 设置html文件标题
      title: '学习TypeScirpt数据结构与算法',
      // 指定要使用的模块所在的路径
      template: './src/index.html'
    })
  ],
  resolve: {
    // 解析到文件时自动添加扩展名
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts'],
    // 给常见的路径起一个别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
