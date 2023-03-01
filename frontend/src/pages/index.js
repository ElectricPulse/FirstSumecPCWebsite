import React, { useState, useEffect, useRef } from 'react'
import { useNotify, useSelector } from '/store'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import Content from '/components/Boilerplate/Content'
import NoteList from '/components/Note/List'
import AddNote from '/components/Note/Add'
import styles from './index.module.css'
import './common.css'

const main = () => {
	const [ visible, setVisible ] = useState(false)
	const notify = useNotify()
	const navigate = useNavigate()
	const token = useSelector(s => s.token)
	function clickHandler() {
		if(token == "")
			navigate('/login')
		else
			setVisible(true)
	}

	return (
		<Content name={styles.index}>
			{ !visible && <section className={styles.cta}>

			<label>Pridať nové poznámky: </label>
			<button className={styles.button} onClick={clickHandler}>+</button>
			</section> }
			{ visible && <AddNote onClose={() => setVisible(false)} onCompletion={(error) => {
				notify(error ? "Something went wrong": "Succesfully added", error)
				setVisible(error)
			}}/> }
			<NoteList/>
		</Content>
	)	
}

export default main
