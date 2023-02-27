const mysql = require('mysql')
const fs = require('fs')
const settings = require('../shared/settings.json')

const connection = mysql.createConnection(settings.database)

function makeId(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	for(let i = 0; i < characters.length; ++i){
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}

	return result
}	

function login(data, callback) {
	const command = `
	SELECT * FROM accounts
	WHERE email=? AND password=?;
	`
	debugger
	connection.query(command, [data.email, data.hashedPassword], (error, results) => {
		callback(error, results?.length == 1)
	})
}

function insertNote(payload) {
	const command = `
	INSERT INTO notes (name, description, author, date, subject) 
	SELECT ?, ?, ?, ?, ?;
	`
	connection.query(command,[payload.name, payload.description, payload.author, payload.date, payload.subject], (error, result) => {
		for(let i = 0; i < payload.filenames.length; ++i){
			const filename = payload.filenames[i]
			const command_filename = `
			INSERT INTO notes_images (notes_id, filename)
			SELECT ?, ?;
			` 

			connection.query(command_filename, [result.insertId, filename], () => {})
		}
	})

}

function copyImages(files, payload) {
	const keys = Object.keys(files)
	payload.filenames = []

	for(let i = 0; i < keys.length ;++i){
		const file = files[keys[i]]
		if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg')
			return 1
		let extension = file.originalFilename.match(/(jpg|png|jpeg)$/)
		if(extension.length != 2)
			return 1

		extension = extension[0]	
		filename = makeId(5) + '.' + extension

		payload.filenames[i] = filename

		fs.copyFileSync(file.filepath, `${__dirname}/images/${filename}`)		
	}
	return 0
}

function getNote(note_id, callback) {
	const cmd = `
	SELECT notes.*, JSON_ARRAYAGG(notes_images.filename)
	FROM notes
	INNER JOIN notes_images
	ON notes.id = notes_images.notes_id
	WHERE id = ${note_id}
	GROUP BY notes.id
	`

	connection.query(cmd, (error, data) => {
		if(error || data.length == 0)
			return callback(true, null)



		const note = data[0]
		const key = 'JSON_ARRAYAGG(notes_images.filename)'
		note.images = ['']
		imagesIndex = 0

		for(let i = 0; i < note[key].length; ++i) {
			if(note[key][i] == '[' || note[key][i] == ']' || note[key][i] == '"' || note[key][i] == ' ')
				continue

			if(note[key][i]== ',') { 
				note.images[++imagesIndex] = ''
				continue
			}
			
			
			note.images[imagesIndex] += note[key][i]
		}

		delete note[key]

		callback(false, note)
	})
}

function authMail(token, callback) {
	const command = `
	INSERT INTO accounts (username, password, email)
	SELECT username, password, email
	FROM preregister
	WHERE token = ?;
	DELETE FROM preregister
	WHERE token = ?;
	`

	connection.query(command, [token, token], (error, results) => {
		debugger
		callback(error || results.affectedRows === 0)
	})
}

function preRegister({username, hashedPassword, email, token}, callback) {
	const command = `
	INSERT INTO preregister (username, password, email, token) 
	SELECT ?, ?, ?, ?
	WHERE NOT EXISTS (
		SELECT 1 FROM preregister WHERE email = ?
	) AND NOT EXISTS (
		SELECT 1 FROM accounts WHERE email = ?
	);
	`
	connection.query(command, [username, hashedPassword, email, token, email, email], (error, results) => {
		callback(error, results.affectedRows === 0)
	})
}

function getUser(email, callback) {
	const command = `
	SELECT email, username
	FROM accounts
	WHERE email=?
	`

	connection.query(command, [email], (error, data) => {
		callback(error, data[0])
	})
}

function listNotes(callback) {
	const command = `
	SELECT notes.*, JSON_ARRAYAGG(notes_images.filename)
	FROM notes
	INNER JOIN notes_images
	ON notes.id = notes_images.notes_id
	GROUP BY notes.id
	`
	connection.query(command, (error, data) => {
		if(error)
			return callback(true, null)
			

		
		for(let i = 0; i < data.length; ++i) {
			const key = 'JSON_ARRAYAGG(notes_images.filename)'
			const note = data[i]

			let inElement = false;
			let elementIndex = 0;
			note.images = ['']
			for(let j = 0; j < note[key].length; ++j){
				if(note[key][j] === '"') {
					if(inElement == true) 
						note.images[++elementIndex] = ''

					inElement = !inElement
					continue
				}

				if(inElement)
					note.images[elementIndex] += note[key][j]
					
			}
			delete note[key]
			note.images.pop()
		}
		
		data.reverse()
		callback(false, data)
	})
}

connection.connect((error) => {
	if (error)
		console.log("Failed to connect to MySQL", error)

	if(require.main === module) 
		getNote(72, () => {})
})

module.exports = {
	insertNote,
	copyImages,
	listNotes,
	getNote,
	authMail,
	preRegister,
	login,
	getUser, 
}
