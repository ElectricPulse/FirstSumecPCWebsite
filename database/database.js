const mysql = require('mysql')
const fs = require('fs')
const settings = require('../shared/settings.json')

const connection = mysql.createConnection(settings.database)

const makeId = require('./utils/makeId')	

function singleChange(command, data){
	return new Promise(function(resolve, reject) {
		connection.query(command, data, function (error, result) {
			if(error)
				return reject(error)

			if(result.affectedRows !== 1)
				return reject("No data was changed")

			resolve(result)
		})
	})
}


function multipleChanges(command, data){
	return new Promise(function(resolve, reject) {
		connection.query(command, data, function (error, result) {
			if(error)
				return reject(error)

			if(result.affectedRows === 0)
				return reject("No data was changed")

			resolve(result)
		})
	})
}


function select(command, data){
	return new Promise(function(resolve, reject) {
		connection.query(command, data, function(error, result) {
			if(error)
				return reject(error)

			if(result.length === 0)
				return reject("Couldnt fetch anything")
			
			resolve(result)
		})
	})
}	

function selectNull(command, data){
	return new Promise(function(resolve, reject) {
		connection.query(command, data, function(error, result) {
			if(error)
				return reject(error)
			resolve(result)
		})
	})
}

async function login(data) {
	const command = `
	SELECT * FROM accounts
	WHERE email=? AND password=?;
	`
	await select(command, [data.email, data.hashedPassword])
}

async function insertNote(payload) {
	const command = `
	INSERT INTO notes (name, email, description, author, date, subject) 
	SELECT ?, ?, ?, ?, ?, ?
	`
	const result = await singleChange(command,[payload.name, payload.email, payload.description, payload.author, payload.date, payload.subject])

	for(let i = 0; i < payload.filenames.length; ++i){
		const filename = payload.filenames[i]
		const command_filename = `
		INSERT INTO notes_images (notes_id, filename)
		SELECT ?, ?
			` 
		await singleChange(command_filename, [result.insertId, filename])	
	}
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
}

async function deleteNote(id, email) {
	const command = `
	DELETE from notes
	WHERE id=? AND email=?
	`
	debugger
	await singleChange(command, [id, email])

	const command_images = `
	DELETE from notes_images
	WHERE notes_id=?
	`
	await multipleChanges(command_images, [id])

	debugger
}

async function getUserNotes(email) {
	const command = `
	SELECT notes.*, JSON_ARRAYAGG(notes_images.filename)
     FROM notes
     INNER JOIN notes_images
 ON notes.id = notes_images.notes_id
     WHERE email = ?
     GROUP BY notes.id
	`
	const notes = await selectNull(command, [email])
	for(note of notes) {
		const key = 'JSON_ARRAYAGG(notes_images.filename)'

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
	notes.reverse()
	return notes
}

async function getNote(note_id) {
	const cmd = `
	SELECT notes.*, JSON_ARRAYAGG(notes_images.filename)
	FROM notes
	INNER JOIN notes_images
	ON notes.id = notes_images.notes_id
	WHERE id = ?
	GROUP BY notes.id
	`

	const data = await selection(cmd,[note_id])
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

		delete note[key]
	}
}

async function authMail(token) {
	const command = `
	INSERT INTO accounts (username, password, email)
	SELECT username, password, email
	FROM preregister
	WHERE token = ?;
	DELETE FROM preregister
	WHERE token = ?;
	`

	await multipleChanges(command, [token, token])
}

async function preRegister({username, hashedPassword, email, token}) {
	const command = `
	INSERT INTO preregister (username, password, email, token) 
	SELECT ?, ?, ?, ?
	WHERE NOT EXISTS (
		SELECT 1 FROM preregister WHERE email = ?
	) AND NOT EXISTS (
		SELECT 1 FROM accounts WHERE email = ?
	);
	`
	await singleChange(command, [username, hashedPassword, email, token, email, email])
}

async function changePassword(email, password) {
	const command = `
		UPDATE accounts
		SET password = ?
		WHERE email = ?;
	`

	await singleChange(command, [password, email])
}

async function getUser(email) {
	const command = `
	SELECT email, username
	FROM accounts
	WHERE email=?
	`
	const user = await select(command, [email])
	return user[0]
}

async function listNotes() {
	const command = `
	SELECT notes.*, JSON_ARRAYAGG(notes_images.filename)
	FROM notes
	INNER JOIN notes_images
	ON notes.id = notes_images.notes_id
	GROUP BY notes.id
	`
	const data = await selectNull(command, [])
		
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
	return data
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
	changePassword,
	getUserNotes,
	deleteNote,
}
