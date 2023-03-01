import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Content from '/components/Boilerplate/Content'
import NoteDetails from '/components/Note/Details'

import './common.css'

const main = () => {
	const { id } = useParams()
	const [note, setNote] = useState(null)

	useEffect(() => {
		fetch(`/api/note/${id}`)
		.then(response => response.json())
		.then(data => setNote(data));
	})

	return (
		<Content name="index">
			{note && <NoteDetails note={note}/>}
		</Content>
	)	
}

export default main
