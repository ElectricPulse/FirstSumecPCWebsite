import React, { useState, useEffect } from 'react'
import NoteUserPreview from '/components/Note/UserPreview'
import { useSelector } from '/store.js'

function main() {
	const [notes, setNotes] = useState()
	const store = useSelector(s => s)

	function deleteHandler(noteId) {
		setNotes((notes) => notes.filter((note) => {
			if(note.id === noteId) {
				const xhr = new XMLHttpRequest()
				xhr.open('DELETE', '/api/deleteNote/' + noteId, true)
				xhr.setRequestHeader('Authorization', store.token)

				xhr.onreadystatechange = function() {
					if(this.readyState === 4 && this.status === 200){
						console.log("Succesfully deleted")
					}
				}
				xhr.send()
				return false
			}
				

			return true
		}))
	}

	useEffect(() => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/listUserNotes', true)
		xhr.setRequestHeader('Authorization', store.token)

		xhr.onreadystatechange = function() {
			if(this.readyState === 4 && this.status == 200) {
				setNotes(JSON.parse(this.responseText))
			}
		}
		xhr.send()
	}, [])
	
	return (
		<div>	
			{store.user.email}
			{store.user.username}
			{notes && notes.map((note) => <NoteUserPreview onDelete={() => deleteHandler(note.id)} key={note.id} note={note}/>)}
		</div>
	)
}

export default main
