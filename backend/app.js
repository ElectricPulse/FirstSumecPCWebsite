const express = require ('express')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const port = 850

const frontendPath = path.join(__dirname, '../frontend/dist/')

const app = express()

const addnote = (req) => {
	if(req.headers['content-type'] != 'multipart/form-data' || req.method != 'POST')
		return 1
			
	const payload = formidable()
	form.parse(req, (err, fields, files) => {
			if(err)
				return 1
			
			debugger
	});

	return 0
}

app.post('/api/addnote', (req, res) => {
	if(addnote(req))
		res.statusCode = 201
	else
		res.statusCode = 501
	
	res.send()
})

app.use(express.static(frontendPath))

app.listen(port, () => {
	console.log(`Server running at http://${port}/`)
})
