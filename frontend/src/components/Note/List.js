import React, { useState, useEffect, useRef } from 'react'
import NotePreview from './Preview.js'
import styles from './List.module.css'

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
	const [query, setQuery] = useState({})
	const filtered = useRef([])

	function changeHandler(event) {
		const element = event.target
		
		setQuery((query) => ({ ...query, [element.id]: element.value.trim().toLowerCase() }))
	}

	function filterNote(note) {
		//The query system is dynamic based on the id of the <input/> so we need to iterate
		for(let [key, value] of Object.entries(query)) {
			if(!value)
				continue

			if(key == 'author' || key == 'name')
				if(note[key].toLowerCase().includes(value))
					return false


			if(key == 'daysago')
				if(getTimeDifference(note.date) > value)
					return false
		}
	
		return true
	}

	useEffect(() => {
		fetchNotes((notes) => {
			setNotes(notes)
			filtered.current = notes.filter(filterNote)
		})
	}, [])
	
	useEffect(() => {
		filtered.current = notes.filter(filterNote)
	}, [notes, query])

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
		{filtered.current.length == 0 && <div className={styles.notfound}>Nič som nenašiel</div>}
		<ul className={styles.list}>
			{filtered.current.map((note) => <NotePreview key={note.id} note={note}/>)}
		</ul>
	</section>
)
}

export default main

