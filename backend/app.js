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

function auth(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(!token)
		return res.sendStatus(403)

	jwt.verify(token, settings.jwt.access, (error, data) => {
		if (error) 
			return res.sendStatus(403)	

		req.email = data.email
		req.tokenData = data
		next()
	})
}

function sendResponseCreated(res, error) {
	res.sendStatus(error ? 500 : 201)
}

function sendResponse(res, error) {
	res.sendStatus(error ? 500 : 200)
}

function hashPassword(password) {
	return crypto.pbkdf2Sync(password, settings.passHash.key, settings.passHash.iterations, 64, 'sha512').toString('hex')
}

function addnote (req, res) {
	db.getUser(req.email, (error, data) => {
	if(error)
		sendResponseCreate(res, true)
	if(!/.*multipart\/form-data.*/.test(req.headers['content-type']))
		return sendResponseCreated(res, true)
			
	const payload = formidable()
	payload.parse(req, (err, fields, files) => {
		debugger
		if(err) 
			return sendResponseCreated(res, true)

		if(!/\d{4}-\d{2}-\d{2}/.test(fields.date))
			return sendResponseCreated(res, true)
		
		let i = 0
		while(settings.subjects[i++] != fields.subject) {
			if(i == settings.subjects.length)
				return sendResponseCreated(res, true)
		}
		

			fields.author = data.username;
			fields.email = req.email;
			db.copyImages(files, fields)
		
			sendResponseCreated(res, db.insertNote(fields))
	})
	})
}

app.delete('/api/deleteNote/:id', auth, (req, res) => {
	db.getNote(req.params.id, (error, data) => {
		if(error) {
			return sendResponse(res,true)
		}
		
		if(data.email === req.email)
			db.deleteNote(req.params.id, (error) => {
				if(error)
					return sendResponse(res,true)
			
				res.sendStatus(204)
			})
	})
})

app.get('/api/listUserNotes', auth, (req, res) => {
	debugger
	db.getUserNotes(req.email, (error, data) => {
		debugger
		if(error)
			sendResponse(req, true)
		else
			res.json(data)
	})
})

app.post('/api/login', (req, res) => {
	const { email, password } = req.body
	if(email == undefined || password == undefined)
			sendResponse(res, true)
	const hashedPassword = hashPassword(password)

	db.login({email, hashedPassword}, (error, exists) => {
		if(error || !exists)
			return sendResponse(res, true)
		
		const accessToken = jwt.sign({ email }, settings.jwt.access, {expiresIn: '24h'})
		res.json({accessToken})
	})
})

app.get('/api/user', auth, (req, res) => {

	const user = db.getUser(req.email, (error, data) => {
		if(error)
			res.sendStatus(404)

		res.json(data)
	})
})

app.get('/api/authMail/:token', (req, res) => {

	db.authMail(req.params.token, (error) => {
		sendResponseCreated(res, error)
	})
})

app.post('/api/resetPassword',auth, (req, res) => {
	if(req.tokenData.action  === "reset_password") {


			const hashedPassword = hashPassword(req.body.password)
		db.changePassword(req.tokenData.email, hashedPassword, (error) => {
			sendResponse(res, error)

		})
	}
})

app.get('/api/userNotes',auth, (req, res) => {
	const email = req.body.email
})

app.post('/api/resetPasswordMail', (req, res) => {
	const email = req.body.email
	if(email == undefined)
		return sendReponse(res, true)


	const user = db.getUser(email, (error, data) => {
	debugger
	if(data == undefined)
		return sendReponse(res, true)

		const token = jwt.sign({ email: req.body.email, action: "reset_password" }, settings.jwt.access, {expiresIn: "15m"})

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: settings.nodemailer.email,
				pass: settings.nodemailer.password
			}
		})
		const mail = {
			from: 'hackermansmurf1@gmail.com',
			to: email,
			subject: 'Zabudnuté heslo, FirstSumecPC',
			text: `
			Ahoj, "${data.username}"
			Aby si zmenil heslo klikni na:
			http://${currentSettings.ip}:${currentSettings.port}/resetPassword/${token}
			`
		}	

		transporter.sendMail(mail, (error, info) => {
			debugger
			sendResponse(res, error)
		})
	})
})

app.post('/api/register', (req,res) => {
	const { username, password, email } = req.body
	if(username == undefined || password == undefined)
		sendResponse(res, true)

	const hashedPassword = hashPassword(password)
	const token = crypto.randomBytes(8).toString('hex')	
	db.preRegister({username, hashedPassword, email, token}, (error, exists) => {
		if(error || exists)
			sendResponseCreated(res, true)

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: settings.nodemailer.email,
				pass: settings.nodemailer.password
			}
		})
		const mail = {
			from: 'hackermansmurf1@gmail.com',
			to: email,
			subject: 'Overenie mailu, FirstSumecPC',
			text: `
			Ahoj, "${username}"
			Aby si dokončil registráciu klikni na tento link:
			http://${currentSettings.ip}:${currentSettings.port}/authMail/${token}
			`
		}	

		transporter.sendMail(mail, (error, info) => {
			if(error)
				return sendResponseCreated(res, true)

			sendResponseCreated(res, false)
		})
	})
})

app.post('/api/addnote', auth, (req, res) => {
	addnote(req, res)
})

app.get('/api/listnotes', (req, res) => {
	db.listNotes((error, data) => {
		if(error) 
			return res.sendStatus(500)
		
		res.statusCode = 201
		res.json(data)
	})
})

app.get('/api/note/:id', (req,res) => {
	db.getNote(req.params.id, (error, data) => {
		if(error) {
			res.statusCode = 500
			res.send()
		}

		res.statusCode = 200
		res.json(data)
	})
})

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
})
