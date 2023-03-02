const express = require ('express')
const path = require('path')
const settings = require('../shared/settings.json')
const app = express()



const currentSettings = settings.server.local ? settings.server.localhost : settings.server.host
app.use(express.json())


app.use('/api/images', express.static('../database/images'))
app.use('/api/images', express.static('./images'))

app.get('*index.js', (req,res) => {
	res.sendFile(path.resolve('../frontend/out/index.js'))
})

const ip = currentSettings.ip

let port = currentSettings.port
if(!process.env.HOST)
	++port

app.listen(port, ip, () => {
	console.log(`Server running at: ${ip}:${port}`)
})

module.exports = app
