const express = require ('express')
const formidable = require('formidable')
const path = require('path')
const db = require('../database/database.js')
const settings = require('../shared/settings.json')
const app = express()
const crypto = require('crypto')
const nodemailer = require('nodemailer')

app.use(express.json())

const sendResponse = (res, error) => {
	res.statusCode = error ? 500 : 201
	res.send()
}

const addnote = (req, res) => {
	if(!/.*multipart\/form-data.*/.test(req.headers['content-type']))
		return sendResponse(res, true)
			
	const payload = formidable()
	payload.parse(req, (err, fields, files) => {
		if(err) 
			return sendResponse(res, true)

		if(!/\w+ \w+/.test(fields.author))
			return sendResponse(res, true)

		if(!/\d{4}-\d{2}-\d{2}/.test(fields.date))
			return sendResponse(res, true)
		
		let i = 0
		while(settings.subjects[i++] != fields.subject) {
			debugger
			if(i == settings.subjects.length)
				return sendResponse(res, true)
		}
		
		db.copyImages(files, fields)

		sendResponse(res, db.insertNote(fields))
	})
}

app.post('/api/register', (req,res) => {
	const { username, password, email } = req.body
	const token = crypto.randomBytes(16).toString('hex')	
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
		http://authenticate/${token}
		`,
		secure: false
	}

	transporter.sendMail(mail, (error, info) => {
		if(error)
			return sendResponse(res, true)
	})


	db.preRegister({username, password, email, token}, (error) => {
		if(error)
			return sendResponse(res, true)
		
		sendResponse(res, false)
	})
})

app.post('/api/addnote', (req, res) => {
	addnote(req, res)
})

app.get('/api/listnotes', (req, res) => {
	db.listNotes((error, data) => {
		if(error) {
			res.statusCode = 500
			res.send()
		}
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

app.listen(settings.serverPort, () => {
	console.log(`Server running at :${settings.serverPort}`)
})
