import { useRef } from 'react'
import React from 'react'
import './AddNote.css'


const AddNote = () => {
	const nameRef = useRef();
	const authorRef = useRef();
	const dateRef = useRef();
	const filesRef = useRef();
	const subjectRef = useRef();

	const handleSubmit = (ev) => {
		ev.preventDefault()
		const name = nameRef.current.value
		const author = authorRef.current.value
		const date = dateRef.current.value
		const subject = subjectRef.current.value
		
		const payload = new FormData()
		payload.append("name", name)
		payload.append("author", author)
		payload.append("date", date)
		payload.append("subject", subject)
		
		/*const fileList = filesRef.current.files
		const numFiles = fileList.length
		for(let i = 0; i < numFiles; i++) {
			const file = fileList[i]
		}
		*/

		const XHR = new XMLHttpRequest();

		XHR.addEventListener('load', (ev) => {

			if(XHR.status == 201)
				console.log("Added note")
			else
				console.log(`Failed to add note: ${XHR.status}`)
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
		<form className="addnote" onSubmit={handleSubmit}>
			<label htmlFor="author">Author: </label>
			<input type="text" id="author" ref={authorRef}/>

			<label htmlFor="name">Note Name: </label>
			<input id="name" type="text" ref={nameRef}/>
			
			<label htmlFor="date">Date: </label>
			<input id="date" type="date" ref={dateRef}/>

			<label htmlFor="files">Photos: </label>
			<input id="files" type="file" accept="image/png, image/jpeg" multiple ref={filesRef}/>
			
			<select name="subject" ref={subjectRef}>
				<option>Mat</option>
				<option>Mam</option>
				<option>Chem</option>
			</select>

			<input type="submit"/>
		</form>
	)
}
	
export default AddNote
