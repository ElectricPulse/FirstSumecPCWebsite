import React, { useRef } from 'react'
import styles from 'Register.module.css'

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
		<form onSubmit={handleSubmit}>
			<fieldset>
			<label htmlFor="name">Krstné meno:</label>
			<input placeholder="Simon" required type="text" id="name" ref={nameRef}/>
			</fieldset>

			<label htmlFor="surname">Priezvisko:</label>
			<input placeholder="Dubek" required type="text" id="surname" ref={surnameRef}/>

			<label htmlFor="email">Email:</label>
			<input placeholder="Simon Dubek" required type="email" id="email" ref={emailRef}/>

			<label htmlFor="password">Password:</label>
			<input placeholder="Simon Dubek" required type="password" id="password" ref={passwordRef}/>

			<input type="submit"/> 
		</form>
	)	
}

export default main
