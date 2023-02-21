import React, { useState, useEffect } from 'react'
import NotePreview from './NotePreview.js'
import './NoteList.css'

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
	<ul className="notes-list">
		{notes.map((note) => <NotePreview key={note.id} note={note}/>)}
	</ul>
)
}


export default main

