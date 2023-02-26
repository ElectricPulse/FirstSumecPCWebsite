import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import React from 'react'
import styles from './AddNote.module.css'
import Button from './Button'
import settings from '@shared/settings'

const AddNote = (props) => {
	const token = useSelector(state => state.token)
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
		const date = dateRef.current.value
		const subject = subjectRef.current.value
		const description = descriptionRef.current.value
		
		const payload = new FormData()
		payload.append("name", name)
		payload.append("date", date)
		payload.append("subject", subject)
		payload.append("description", description)
		
		const fileList = filesRef.current.files
		const numFiles = fileList.length
		for(let i = 0; i < numFiles; i++) {
			const file = fileList.item(i)
			payload.append(file.name, file)
		}
		
		const xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/addnote')
		xhr.setRequestHeader('Authorization', token)
		xhr.onreadystatechange = function() {
			if(this.readyState == 4){
				if(this.status == 201) {
					setError(false)
					setErrorReason(false)
					props.onCompletion(false);
				} else {
					setError(true)
					setErrorReason("because y9u suck")
					props.onCompletion(true);
				}
			}
		}

		xhr.send(payload)
		return false
	}

	return (
		<section className={styles.container}>
			<button onClick={props.onClose}>
				<img src="/api/images/cross.svg"/>
			</button>
		<form className={styles.form} onSubmit={handleSubmit}>
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
			<Button className={styles.submit} submit/>
		</form>
		</section>
	)
}
	
export default AddNote
