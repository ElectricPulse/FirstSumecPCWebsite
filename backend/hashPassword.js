const crypto = require('crypto')

module.exports = function hashPassword(password) {
	return crypto.pbkdf2Sync(password, settings.passHash.key, settings.passHash.iterations, 64, 'sha512').toString('hex')
}

