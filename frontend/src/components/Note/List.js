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
	const query = useRef({})
	const [filtered, setFiltered] = useState([])

	function filterNote(note) {
		//The query system is dynamic based on the id of the <input/> so we need to iterate
		for(let [key, value] of Object.entries(query.current)) {
			if(!value)
				continue

			if(key == 'author' || key == 'name')
				if(!note[key].toLowerCase().includes(value))
					return false


			if(key == 'daysago')
				if(getTimeDifference(note.date) > value)
					return false
		}
	
		return true
	}	
	function filterNotes() {
		setFiltered(notes.filter(filterNote))
	}
	

	function changeHandler(event) {
		const element = event.target
		
		query.current = { ...query, [element.id]: element.value.trim().toLowerCase() }
		filterNotes()
	}	

	useEffect(() => {
		fetchNotes((notes) => {
			setNotes(notes)
		})
	}, [])

	useEffect(() => {
		filterNotes()
	}, [notes])
	


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
		{filtered.length === 0 && notes.length !== 0 && <div className={styles.notfound}>Nič som nenašiel</div>}
		<ul className={styles.list}>
			{filtered.map((note) => <NotePreview key={note.id} note={note}/>)}
		</ul>
	</section>
)
}

export default main

