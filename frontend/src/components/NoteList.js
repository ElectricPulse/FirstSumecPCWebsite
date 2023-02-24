import React, { useState, useEffect, useRef } from 'react'
import NotePreview from './NotePreview.js'
import styles from './NoteList.module.css'
import settings from '@shared/settings.json'
import getTimeDifference from '/utils/getTimeDifference'

function fetchNotes(setNotes) {
	fetch('/api/listnotes')
		.then(response => response.json())
		.then(data => {
			setNotes(data)
		});
}


function main() {
	const [notes, setNotes] = useState([])
	const [filteredNotes, setFilteredNotes] = useState([])
	const [query, setQuery] = useState({name: undefined, author: undefined, daysago: undefined})

	function changeHandler(event) {
		const element = event.target
		let temp = query;
		
		setQuery({ ...temp, [element.id]: element.value.trim().toLowerCase() })
	}

	useEffect(() => {
		let newNotes = []
		let newNotesIndex = 0

		for(let i = 0; i < notes.length; ++i){
			const note = notes[i]
			let filter = 0;
			
			for(let [key, value] of Object.entries(query)) {
				if(!value)
					continue

				if(filter)
					break
				
				if(key == 'author' || key == 'name') {
					filter = !note[key].toLowerCase().includes(value)
					continue
				}

				if(key == 'daysago'){
					filter = getTimeDifference(note.date) > value
					continue
				}
			}

			if(!filter)
				newNotes[newNotesIndex++] = note
		}

		setFilteredNotes(newNotes)	
	}, Object.values(query))

	useEffect(() => {
		fetchNotes((notes) => {
			setNotes(notes)
			setFilteredNotes(notes)
		})
	}, [])
return (
	<section className={styles.container}>
	<form className={styles.form} onChange={changeHandler}>
		<label htmlFor="name">Názov</label>
		<input type="text" id="name"/>

		<label htmlFor="author">Autor</label>
		<input type="text" id="author"/>

		<label htmlFor="daysago">Pred dňami</label>
		<input type="number" id="daysago" min="0" max="30"/>

		<select>
			{settings.subjects.map((subject) => <option key={subject}>{subject}</option>)}
		</select>
	</form>
	<hr className={styles.horizontalRuler}/>
	{filteredNotes.length == 0 && <div className={styles.notfound}>Nič som nenašiel</div>}
	<ul className={styles.list}>
		{filteredNotes.map((note) => <NotePreview key={note.id} note={note}/>)}
	</ul>
	</section>
)
}


export default main

