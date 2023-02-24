import { useRef, useState } from 'react'
import React from 'react'
import styles from './AddNote.module.css'
import settings from '@shared/settings'

const AddNote = (props) => {
	const nameRef = useRef();
	const authorRef = useRef();
	const dateRef = useRef();
	const filesRef = useRef();
	const subjectRef = useRef();
	const descriptionRef = useRef();

	const [error, setError] = useState(false)
	const [errorReason, setErrorReason] = useState('bruh')

	const handleSubmit = (ev) => {
		ev.preventDefault()
		const name = nameRef.current.value
		const author = authorRef.current.value
		const date = dateRef.current.value
		const subject = subjectRef.current.value
		const description = descriptionRef.current.value
		
		const payload = new FormData()
		payload.append("name", name)
		payload.append("author", author)
		payload.append("date", date)
		payload.append("subject", subject)
		payload.append("description", description)
		
		const fileList = filesRef.current.files
		const numFiles = fileList.length
		for(let i = 0; i < numFiles; i++) {
			const file = fileList.item(i)
			payload.append(file.name, file)
		}

		const XHR = new XMLHttpRequest();

		XHR.addEventListener('load', (ev) => {
			if(XHR.status == 201){
				setError(false)
				setErrorReason(false)
				props.onCompletion(false);
			} else {
				setError(true)
				setErrorReason("because y9u suck")
				props.onCompletion(true);
			}
		})

		XHR.addEventListener('error', (ev) => {
			console.log("failed to add note")
		})

		const url = '/api/addnote'
		XHR.open('POST', url)
		XHR.send(payload)
		return false
	}

	return (
		<section className={styles.container}>
			<button onClick={props.onClose}>
				<img src="/api/images/cross.svg"/>
			</button>
		<form className={styles.form} onSubmit={handleSubmit}>
			<label htmlFor="author">Author: </label>
			<input placeholder="Jozko Mrkvicka" required type="text" id="author" ref={authorRef}/>

			<label htmlFor="name">Note Name: </label>
			<input placeholder="Horvathove poucky o silach" required id="name" type="text" ref={nameRef}/>
			
			<label htmlFor="date">Date: </label>
			<input  required id="date" type="date" ref={dateRef}/>

			<label htmlFor="files">Photos: </label>
			<input required id="files" type="file" accept="image/png, image/jpeg" multiple ref={filesRef}/>
			
			<label htmlFor="description">Description: </label>
			<textarea placeholder="Prva fotka je opis Newtnovych zakonov" id="description" required ref={descriptionRef}></textarea>
			
			<select name="subject" ref={subjectRef}>
				{settings.subjects.map((subject) => <option key={subject}>{subject}</option>)}
			</select>
			<input type="submit"/>
		</form>
		</section>
	)
}
	
export default AddNote
