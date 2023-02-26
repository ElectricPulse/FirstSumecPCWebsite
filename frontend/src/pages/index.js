import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import Content from '/components/Content'
import NoteList from '/components/NoteList'
import AddNote from '/components/AddNote'
import Notification from '/components/Notification'
import styles from './index.module.css'
import './common.css'

const main = () => {
	const [ visible, setVisible ] = useState(false)
	const notificationRef = useRef()
	const navigate = useNavigate()
	const token = useSelector((state) => state.token);

	function clickHandler() {
		if(token == undefined)
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
				notificationRef.current.notify(error ? "Something went wrong": "Succesfully added", error)
				setVisible(error)
			}}/> }
			<NoteList/>
			<Notification ref={notificationRef}/>
		</Content>
	)	
}

export default main
