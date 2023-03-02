const nodemailer = require('nodemailer')
const settings = require('../shared/settings.json')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: settings.nodemailer.email,
		pass: settings.nodemailer.password
		}
})

module.exports = (email, {subject, text}) => new Promise(function(resolve, reject) {
	const mail = {
		from: 'hackermansmurf1@gmail.com',
		to: email,
		subject,
		text,
	}	

	transporter.sendMail(mail, (error, info) => {
		if(error)
			reject(error)
		resolve()
	})
})
