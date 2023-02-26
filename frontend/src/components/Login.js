import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './Account.module.css'
import Button from './Button'

function main(props) {
	const passwordRef = useRef()
	const emailRef = useRef()
	const dispatch = useDispatch() 

	function handleSubmit(event) {
		event.preventDefault()
		const password = passwordRef.current.value
		const email = emailRef.current.value
		
		const xhr = new XMLHttpRequest()
		xhr.open("POST", "/api/login", true)
		xhr.setRequestHeader("Content-Type", "application/json")
		xhr.onreadystatechange = function() {
			if(this.readyState == 4) {
				props.onCompletion(this.status != 200)
				if(this.status != 200)
					return

				dispatch({type: "SET_TOKEN", value: JSON.parse(this.responseText).accessToken})
			}

		}
		const payload = JSON.stringify({email, password})
		xhr.send(payload)
	}

	return (
		<section className={styles.container}>
		<h2>Prihlásenie</h2>
		<form className={styles.form}  onSubmit={handleSubmit}>
			<label htmlFor="email">Email:</label>
			<input placeholder="simon.dubek@gmail.com" required type="email" id="email" ref={emailRef}/>

			<label htmlFor="password">Heslo:</label>
			<input required type="password" id="password" ref={passwordRef}/>
			<Button submit/>
		</form>
		</section>
	)	
}

export default main
