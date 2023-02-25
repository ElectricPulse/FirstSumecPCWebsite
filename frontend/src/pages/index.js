import React, { useState, useEffect, useRef } from 'react'
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
	
	return (
		<Content name={styles.index}>
			{ !visible && <section className={styles.cta}>

			<label>Pridať nové poznámky: </label>
			<button className={styles.button} onClick={setVisible.bind(false)}>+</button>
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
