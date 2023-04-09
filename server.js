const app = require('./src/app.js')

const {app: {port}} = require('./src/configs/configs.mongodb.js')

const server = app.listen(port, () => {
	console.log(`app listening on http://localhost:${port}/`)
})

process.on("SIGINT", () => {
	server.close(() => console.log('server closed'))
})