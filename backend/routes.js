const app = require('./server')
const jwt = require('jsonwebtoken')
const path = require('path')
const auth = require('./auth')
const hashPassword = require('./hashPassword')
const formidable = require('formidable')
const db = require('../database/database.js')
const crypto = require('crypto')
const sendMail = require('./sendMail')
const settings = require('../shared/settings.json')
const currentSettings = settings.server.local ? settings.server.localhost : settings.server.host

app.delete('/api/deleteNote/:id', auth, async (req, res) => {
	try {	
		await db.deleteNote(req.params.id, req.email)
		res.sendStatus(202)
	} catch(error) {
		debugger
		res.sendStatus(500)
	}
})

app.get('/api/listUserNotes', auth, async (req, res) => {
	try {
		const data = await db.getUserNotes(req.email)
		res.json(data)
	} catch(error) {
		res.sendStatus(500)
		debugger
	}
})

app.post('/api/login', async (req, res) => {
	try {
		const { email, password } = req.body
		if(email == undefined || password == undefined)
			throw new Error()

		const hashedPassword = hashPassword(password)

		await db.login({email, hashedPassword})
		
		const accessToken = jwt.sign({ email }, settings.jwt.access, {expiresIn: '24h'})
		res.json({accessToken})
	} catch (error) {
		res.sendStatus(403)
	}
})

app.get('/api/user', auth, async (req, res) => {
	try {
		const user = await db.getUser(req.email)
		res.json(user)
	} catch(error) {
		res.sendStatus(404)
	}
})

app.get('/api/authMail/:token',async (req, res) => {
	try {
		await db.authMail(req.params.token)
		debugger
		res.sendStatus(201)
	} catch(error) {
		res.sendStatus(400)
	}
})

app.post('/api/resetPassword', auth, async (req, res) => {
	debugger
	try {
		if(req.tokenData.action  !== "reset_password") 
			throw new Error()
	
		const hashedPassword = hashPassword(req.body.password)
		await db.changePassword(req.tokenData.email, hashedPassword)
		res.sendStatus(200)
	} catch(error) {
		res.sendStatus(403)
	}
})

app.post('/api/resetPasswordMail', async (req, res) => {
	try {
		const email = req.body.email
		if(email == undefined)
			throw new Error()


		const user = await db.getUser(email)

		const token = jwt.sign({ email: req.body.email, action: "reset_password" }, settings.jwt.access, {expiresIn: "15m"})

		await sendMail(email, {
			subject: 'Zabudnuté heslo, FirstSumecPC',
			text: `
			Ahoj, "${user.username}"
			Aby si zmenil heslo klikni na:
			http://${currentSettings.ip}:${currentSettings.port}/resetPassword/${token}
			`
		})
		res.sendStatus(200)
	} catch(error) {
		debugger
		res.sendStatus(403)
	}
})

app.post('/api/register', async (req,res) => {
	try {
		const { username, password, email } = req.body
		if(username == undefined || password == undefined)
			throw new Error()

		const hashedPassword = hashPassword(password)
		const token = crypto.randomBytes(8).toString('hex')	
		await db.preRegister({username, hashedPassword, email, token})
		await sendMail(email, {
			subject: 'Overenie mailu, FirstSumecPC',
			text: `
			Ahoj, "${username}"
			Aby si dokončil registráciu klikni na tento link:
			http://${currentSettings.ip}:${currentSettings.port}/authMail/${token}
			`
		})
		res.sendStatus(201)
	} catch(error) {
		res.sendStatus(500)
	}	
})

function parseForm(req) {
	const payload = formidable()

	return new Promise((resolve, reject) => {
		payload.parse(req, (err, fields, files) => {
			if(err) 
				return reject()

			if(!/\d{4}-\d{2}-\d{2}/.test(fields.date))
				return reject()
		
			let i = 0
			while(settings.subjects[i++] != fields.subject) {
				if(i == settings.subjects.length)
					return reject()
			}
			fields.files = files
			resolve(fields)
		})
	})	
}

app.post('/api/addnote', auth, async (req, res) => {
	try {
		const user = await db.getUser(req.email)
		const fields = await parseForm(req)
		fields.author = user.username
		db.copyImages(fields.files, fields)
		delete fields.files
		fields.email = req.email
		await db.insertNote(fields)
		res.sendStatus(201)
	} catch(error) {
		res.sendStatus(500)
	}
})

app.get('/api/listnotes', async (req, res) => {
	try {
		const data = await db.listNotes()
		
		res.statusCode = 200
		res.json(data)
	} catch(error) {
		throw new Error(error)
	}
})

app.get('/api/note/:id', async (req,res) => {
	try {
		const note = await db.getNote(req.params.id)
		res.json(note)
	} catch(error) {
		res.sendStatus(404)
	}
})

app.get('*', (req, res) => {
	res.sendFile(path.resolve('../frontend/out/index.html'))
})










