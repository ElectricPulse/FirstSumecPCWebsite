const express = require ('express')
const formidable = require('formidable')
const path = require('path')
const db = require('../database/database.js')
const settings = require('../shared/settings.json')
const app = express()
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const currentSettings = settings.server.local ? settings.server.localhost : settings.server.host
app.use(express.json())


app.use('/api/images', express.static('../database/images'))
app.use('/api/images', express.static('./images'))

app.get('*main.js', (req,res) => {
	res.sendFile(path.resolve('../frontend/dist/main.js'))
})

app.get('*', (req, res) => {
	res.sendFile(path.resolve('../frontend/dist/index.html'))
})	


const ip = "localhost"
const port = currentSettings.port + 1

app.listen(port, ip, () => {
	console.log(`Server running at: ${ip}:${port}`)
}
export default app
