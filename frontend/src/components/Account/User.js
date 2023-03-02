import React, { useState, useEffect } from 'react'
import NoteUserPreview from '/components/Note/UserPreview'
import styles from './User.module.css'
import { useSelector, useNotify } from '/store.js'

function main() {
	const [notes, setNotes] = useState()
	const store = useSelector(s => s)
	const notify = useNotify()

	function deleteHandler(noteId) {
		setNotes((notes) => notes.filter((note) => {
			if(note.id === noteId) {
				const xhr = new XMLHttpRequest()
				xhr.open('DELETE', '/api/deleteNote/' + noteId, true)
				xhr.setRequestHeader('Authorization', store.token)

				xhr.onreadystatechange = function() {
					if(this.readyState === 4){
						if(this.status === 202)
							notify("Succesfully deleted", false)
						else 
							notify("Unsuccesfully deleted", true)
					}
				}
				xhr.send()
				return false
			}
				

			return true
		}))
	}

	useEffect(() => {
		if(store.token.trim() === '')
			return 
		const xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/listUserNotes', true)
		xhr.setRequestHeader('Authorization', store.token)

		xhr.onreadystatechange = function() {
			if(this.readyState === 4 && this.status == 200) {
				setNotes(JSON.parse(this.responseText))
			}
		}
		xhr.send()
	}, [store.token])
	
	return (
		<section className={styles.main}>
			<div className={styles.userDetails}>
				<div>
				Username: {store.user.username}
				</div>
				<div>
				Your Email: {store.user.email}
				</div>
			</div>
			{notes && notes.map((note) => <NoteUserPreview onDelete={() => deleteHandler(note.id)} key={note.id} note={note}/>)}
		</section>
	)
}

export default main
