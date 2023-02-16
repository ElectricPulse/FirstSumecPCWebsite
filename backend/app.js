const express = require ('express')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const port = 81

const app = express()

const addnote = (req) => {
	debugger
	if(req.headers['content-type'] != 'multipart/form-data' || req.method != 'POST')
		return 1
			
	const payload = formidable()
	form.parse(req, (err, fields, files) => {
			if(err)
				return 1
			
	});

	return 0
}

app.post('/api/addnote', (req, res) => {
	if(addnote(req))
		res.statusCode = 201
	else
		res.statusCode = 500
	
	res.send()
})

app.listen(port, () => {
	console.log(`Server running at http://${port}/`)
})
