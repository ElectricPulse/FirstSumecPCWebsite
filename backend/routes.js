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

function hashPassword(password) {
	return crypto.pbkdf2Sync(password, settings.passHash.key, settings.passHash.iterations, 64, 'sha512').toString('hex')
}

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
		res.sendStatus(211)
	} catch(error) {
		res.sendStatus(400)
	}
})

app.post('/api/resetPassword',auth, async (req, res) => {
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
				if(error)
					throw new Error()
				res.sendStatus(200)
			})
	} catch(error) {
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
		debugger
		await db.preRegister({username, hashedPassword, email, token})

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
				throw new Error()

			res.sendStatus(201)
		})
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

