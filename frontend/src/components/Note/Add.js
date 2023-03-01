import React, { useRef, useState } from 'react'
import styles from './Add.module.css'
import settings from '@shared/settings'
import { useSelector } from '/store.js'

import Button from '/components/Button'
import Form from '/components/Form'
import Image from '/components/Image'

import checkRefContent from '/utils/checkRefContent'

function NoteForm({onCompletion}) {
	const nameRef = useRef();
	const authorRef = useRef();
	const dateRef = useRef();
	const filesRef = useRef();
	const subjectRef = useRef();
	const descriptionRef = useRef();

	const token = useSelector(s => s.token)

	const [disabled, setDisabled] = useState(true)

	function handleSubmit (event) {
		event.preventDefault()
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
			if(this.readyState === 4)
				onCompletion(this.status !== 201)
		}

		xhr.send(payload)
	}

	return (
	<Form className={styles.form} onSubmit={handleSubmit}>
		<label htmlFor="name">Note Name: </label>
		<input placeholder="Horvathove poucky o silach" required id="name" type="text" ref={nameRef}/>
			
		<label htmlFor="date">Date: </label>
		<input required id="date" type="date" ref={dateRef}/>

		<label htmlFor="files">Photos: </label>
		<input required id="files" type="file" accept="image/png, image/jpeg" multiple ref={filesRef}/>
			
		<label htmlFor="description">Description: </label>
		<textarea placeholder="Prva fotka je opis Newtnovych zakonov" id="description" required ref={descriptionRef}></textarea>
			
		<select name="subject" ref={subjectRef}>
				{settings.subjects.map((subject) => <option key={subject}>{subject}</option>)}
		</select>
	</Form>
	)
}

function main(props) {
	return (
		<section className={styles.container}>
			<button onClick={props.onClose}>
				<Image name="cross.svg"/>
			</button>
			<NoteForm onCompletion={props.onCompletion}/>
		</section>
	)
}
	
export default main
