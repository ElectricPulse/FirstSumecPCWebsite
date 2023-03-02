const jwt = require('jsonwebtoken')
const settings = require('../shared/settings.json')

module.exports = function auth(req, res, next) {
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
