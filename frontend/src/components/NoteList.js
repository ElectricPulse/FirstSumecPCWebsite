import React, { useState, useEffect } from 'react'
import NotePreview from './NotePreview.js'
import styles from './NoteList.module.css'
import settings from '@shared/settings.json'

function fetchNotes(setNotes) {
	fetch('/api/listnotes')
		.then(response => response.json())
		.then(data => {
			setNotes(data)
		});
}

function main() {
	const [notes, setNotes] = useState([])
	useEffect(() => {
		fetchNotes(setNotes)
	})
return (
	<>
	<form className={styles.form}>
		<input/>
		<select>
			{settings.subjects.map((subject) => <option key={subject}>{subject}</option>)}
		</select>
	</form>
	<ul className={styles.list}>
		{notes.map((note) => <NotePreview key={note.id} note={note}/>)}
	</ul>
	</>
)
}


export default main

