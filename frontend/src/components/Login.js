import React, { useRef } from 'react'
import styles from './Account.module.css'
import Button from './Button'

function main(props) {
	const nameRef = useRef()
	const surnameRef = useRef()
	const passwordRef = useRef()
	const emailRef = useRef()

	function handleSubmit(event) {
		//Check for double spaces
		//trim() on backend
		const username = nameRef.current.value + ' ' + surnameRef.current.value
		const password = passwordRef.current.value
		const email = email.current.value

		props.onCompletion(0)
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
