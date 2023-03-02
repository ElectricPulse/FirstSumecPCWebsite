const crypto = require('crypto')
const settings = require('../shared/settings.json')

module.exports = function hashPassword(password) {
	return crypto.pbkdf2Sync(password, settings.passHash.key, settings.passHash.iterations, 64, 'sha512').toString('hex')
}

