const WebSocket = require('ws')

const wss = new WebSocket.Server({port: 81})

const reload = () => {
	wss.clients.forEach((client) => {
		client.send("reload");
	})
	console.log("Reloading")
}

process.on('SIGUSR2', reload)

