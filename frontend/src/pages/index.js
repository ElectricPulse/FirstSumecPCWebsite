import React from 'react'
import Content from '/components/Content'
import NoteList from '/components/NoteList'
import AddNote from '/components/AddNote'
import './index.css'
import './common.css'

const main = () => {
	return (
		<Content name="index">
			<AddNote/>
			<NoteList/>
		</Content>
	)	
}

export default main
