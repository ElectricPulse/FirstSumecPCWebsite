import React from 'react'
import Content from '/components/Content'
import Note from '/components/Note'
import AddNote from '/components/AddNote'
import './index.css'
import './common.css'

const index = () => {
	return (
		<Content name="index">
			<AddNote/>
			<Note subject="MAT" author="Riso Letasi" date="27.1.5 2022" name="Absolutne nerovnice"/>
		</Content>
	)	
}

export default index
