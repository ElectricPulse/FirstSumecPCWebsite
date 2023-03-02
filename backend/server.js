const express = require ('express')
const path = require('path')
const settings = require('../shared/settings.json')
const app = express()
const fs = require('fs')
const https = require('https')
const http = require('http')
const privateKey = fs.readFileSync('ssl/privatekey.pe')
const certificate = fs.readFileSync('ssl/certificate.pem')

const credentials = {key: privateKey, cert: certificate}

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

const httpsServer = https.createServer(credentials, app)

const httpServer = http.createServer(credentials, function(req, res) {
	console.log("redirect")
	res.writeHead(301,{Location: 'https://'+currentSettings.referenceip})
	res.end()
})
httpServer.listen(settings.server.local ? port: 80, ip)

httpsServer.listen(settings.server.local ? port: 443, ip, () => {
	console.log(`Server running at: ${ip}`)
})

module.exports = app
