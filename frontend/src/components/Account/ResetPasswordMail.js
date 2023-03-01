import React, { useRef, useState, useEffect } from 'react'
import styles from './Account.module.css'

import Form from '/components/Form'

function main(props) {
	const emailRef = useRef()

	function handleSubmit(event) {
		event.preventDefault()
		//Check for double spaces
		//trim() on backend
		const email = emailRef.current.value
		xhr.open("POST", "/api/resetPasswordMail", true)
		xhr.setRequestHeader("Content-Type", "application/json")

		xhr.onreadystatechange = function() {
			if(this.readyState === 4) {
				props.onCompletion(this.status != 200)
			}
		}
		const payload = JSON.stringify({email})
		xhr.send(payload)
	}
	
	return (
		<section className={styles.container}>
		<h2>Resetovanie hesla</h2>
		<Form className={styles.form} onSubmit={handleSubmit}>

						<label htmlFor="email">Email:</label>
			<input placeholder="simon.dubek@gmail.com" required type="email" id="email" ref={emailRef}/>
		</Form>
		</section>
	)	
}

export default main
