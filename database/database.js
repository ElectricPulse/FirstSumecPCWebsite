const mysql = require('mysql')
const fs = require('fs')

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "webserver"
})

function makeId(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	for(let i = 0; i < characters.length; ++i){
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}

	return result
}	

function insertNote(payload) {
	const command = `
	INSERT INTO notes (name, description, author, date, subject) 
	VALUES ('${payload.name}', '${payload.description}', '${payload.author}', '${payload.date}', '${payload.subject}')
	`
	connection.query(command, (error, result) => {
		for(let i = 0; i < payload.filenames.length; ++i){
			const filename = payload.filenames[i]
			const command_filename = `INSERT INTO notes_images (notes_id, filename) VALUES ('${result.insertId}', '${filename}')` 

			connection.query(command_filename, () => {})
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

function preRegister(data, callback) {
	
		//Generate entry in unvalidate_users table

		//send email
		callback(0)

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
		console.log("Failed to connect to MySQL")

	if(require.main === module) 
		getNote(72, () => {})
})

module.exports = {
	insertNote,
	copyImages,
	listNotes,
	getNote,
	preRegister,
}
