import React, { useRef, useState, useEffect } from 'react'
import styles from './Account.module.css'

import Button from '/components/Button'

function main(props) {
	const formRef = useRef()
	const nameRef = useRef()
	const surnameRef = useRef()
	const passwordRef = useRef()
	const passwordAuthRef = useRef()
	const emailRef = useRef()
	const [disabled, setDisabled] = useState(true)
	const [passwordMatch, setPasswordMatch] = useState(false)

	function handleSubmit(event) {
		event.preventDefault()
		//Check for double spaces
		//trim() on backend
		const username = nameRef.current.value + ' ' + surnameRef.current.value
		const password = passwordRef.current.value
		const email = emailRef.current.value
		
		
		
		const xhr = new XMLHttpRequest()
		xhr.open("POST", "/api/register", true)
		xhr.setRequestHeader("Content-Type", "application/json")
		
		xhr.onreadystatechange = function() {
			if(this.readyState === 4) {
				if(this.status === 201)
					formRef.current.reset()

				props.onCompletion(this.status != 201)
			}
		}

		const payload = JSON.stringify({username, password, email})
		xhr.send(payload)
	}
	
	function passwordChangeHandler(event) {
		if(passwordRef.current?.value.trim() === "" || passwordAuthRef.current?.value.trim() === "")
			return 

		const match = passwordRef.current.value === passwordAuthRef.current.value	
		
		setPasswordMatch(match ? "match": "dont_match")
		changeHandler('', match)
	}
	
	function changeHandler(event, match = true) {
		const refs = [nameRef, surnameRef, passwordRef, passwordAuthRef, emailRef];
		for(let i in refs) {
			if(!"value" in refs[i].current)
				return

			if(refs[i].current.value.trim() === '') {
				setDisabled(true)
				return
			}
		}
		setDisabled(!match)
	}

	return (
		<section className={styles.container}>
		<h2>Registrácia</h2>
		<form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
			<fieldset>
				<div>
				<label htmlFor="name">Krstné meno:</label>
				<input onChange={changeHandler} placeholder="Simon" required type="text" id="name" ref={nameRef}/>
				</div>
				<div>
				<label htmlFor="surname">Priezvisko:</label>
				<input  onChange={changeHandler}  placeholder="Dubek" required type="text" id="surname" ref={surnameRef}/>
				</div>
			</fieldset>

						<label htmlFor="email">Email:</label>
			<input onChange={changeHandler}  placeholder="simon.dubek@gmail.com" required type="email" id="email" ref={emailRef}/>
			{passwordMatch=="dont_match" && <h3>Passwords dont match</h3>}
			<label htmlFor="password">Heslo:</label>
			<input onChange={changeHandler} required type="password" onChange={passwordChangeHandler} id="password" ref={passwordRef}/>

			<label htmlFor="passwordAuth">Heslo znovu:</label>
			<input onChange={changeHandler}  required type="password" onChange={passwordChangeHandler} id="passwordAuth" ref={passwordAuthRef}/>
			<Button disabled={disabled} submit/>
		</form>
		</section>
	)	
}

export default main
