(() => {
	const socketURL = `ws://${document.domain}:81`
	let socket = new WebSocket(socketURL);
	socket.addEventListener('open', () => {
		console.log("Socket opened")
	})
	socket.addEventListener('error', () => {
		console.log("Socket error")
	})
	socket.addEventListener('message', (ev) => {
		console.log("message")
		if(ev.data == "reload")
			location.reload()
	})
})()
