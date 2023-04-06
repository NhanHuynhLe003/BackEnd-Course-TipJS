const app = require('./src/app.js')

const port = 8080

const server = app.listen(port, () => {
	console.log(`app listening on http://localhost:${port}/`)
})

process.on("SIGINT", () => {
	server.close(() => console.log('server closed'))
})