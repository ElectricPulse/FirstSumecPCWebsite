import React, { useRef } from 'react'
import styles from './Account.module.css'
import Button from './Button'

function main(props) {
	const nameRef = useRef()
	const surnameRef = useRef()
	const passwordRef = useRef()
	const emailRef = useRef()

	function handleSubmit(event) {
		event.preventDefault()
		//Check for double spaces
		//trim() on backend
		const username = nameRef.current.value + ' ' + surnameRef.current.value
		const password = passwordRef.current.value
		const email = emailRef.current.value
		
		
		const xhr = new XMLHttpRequest()
		console.log(username, password, email);
		xhr.open("POST", "/api/register", true)
		xhr.setRequestHeader("Content-Type", "application/json")
		
		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				props.onCompletion(xhr.status != 201)
			}
		}

		const payload = JSON.stringify({username, password, email})
		xhr.send(payload)
	}

	return (
		<section className={styles.container}>
		<h2>Registrácia</h2>
		<form className={styles.form}  onSubmit={handleSubmit}>
			<fieldset>
				<div>
				<label htmlFor="name">Krstné meno:</label>
				<input placeholder="Simon" required type="text" id="name" ref={nameRef}/>
				</div>
				<div>
				<label htmlFor="surname">Priezvisko:</label>
				<input placeholder="Dubek" required type="text" id="surname" ref={surnameRef}/>
				</div>
			</fieldset>

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
