const express = require ('express')
const formidable = require('formidable')
const path = require('path')
const db = require('../database/database.js')
const settings = require('../shared/settings.json')
const crypto = require('crypto')

const port = 81

const app = express()

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
	const password;
	const username;
	const email;
	

	const token = ""
	crypto.randomBytes(48, (error, buffer) => {
		crypto.buffer.toString('hex')}
		if(error)
			sendResponse(res, 1)
	})
	
	//Generate entry in unvalidate_users table
	db.insertUnvalidated

	//send email
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

app.listen(port, () => {
	console.log(`Server running at http://${port}/`)
})
