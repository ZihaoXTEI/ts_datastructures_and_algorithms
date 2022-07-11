export function mapFile() {
	// https://webpack.docschina.org/guides/dependency-management/#requirecontext
	// /\.index\.ts$/
	const files = require.context('../datastructures', true, /\.ts/)

	console.log(files.keys())

	/*   const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  }) */
}
