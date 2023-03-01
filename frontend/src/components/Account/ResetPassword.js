import React, { useRef, useState, useEffect } from 'react'
import styles from './Account.module.css'

import Button from '/components/Form'

function main(props) {
	const passwordRef = useRef()
	const passwordAgainRef = useRef()

	function handleSubmit(event) {
		event.preventDefault()
		//Check for double spaces
		//trim() on backend
		const password = passwordRef.current.value
		const xhr = new XMLHttpRequest()
		xhr.open("POST", "/api/resetPassword", true)
		xhr.setRequestHeader("Content-Type", "application/json")
		xhr.setRequestHeader("Authorization", 'Bearer ' + props.token)


		xhr.onreadystatechange = function() {
			if(this.readyState === 4) {
				props.onCompletion(this.status != 200)
			}
		}
		const payload = JSON.stringify({password})
		xhr.send(payload)
	}
	
	return (
		<section className={styles.container}>
		<h2>Resetovanie hesla</h2>
		<Form className={styles.form} onSubmit={handleSubmit}>

						<label htmlFor="heslo1">Nove Heslo:</label>
			<input required type="password" id="heslo1" ref={passwordRef}/>
						<label htmlFor="heslo2">Nove Heslo Znovu:</label>
					<input required type="password" id="heslo2" ref={passwordAgainRef}/>
		</Form>
		</section>
	)	
}

export default main
