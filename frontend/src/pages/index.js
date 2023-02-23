import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Content from '/components/Content'
import NoteList from '/components/NoteList'
import AddNote from '/components/AddNote'
import styles from './index.module.css'
import './common.css'

function Notification(props) {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if(!props.open) {
			setTimeout(() => {
				setVisible(false);
			}, 3000);
		} else {
			setVisible(true)
		}
	}, [props.open]);
	return createPortal(
		<dialog open={visible} className={`${styles.notification} ${props.open ? styles['notification-open']: styles['notification-closed']} ${props.error ? styles['notification-error'] : styles['notification-success']}`}>{props.children}</dialog>
	, document.getElementById('app'))
}

const main = () => {
	const [ visible, setVisible ] = useState(false)
	const [ completed, setCompleted ] = useState(false)
	const [ status, setStatus ] = useState()
	
	return (
		<Content name={styles.index}>
			{ !visible && <section className={styles.cta}>
			<label>Pridať nové poznámky: </label>
			<button className={styles.button} onClick={() => { setVisible(true); setCompleted(false)}}>+</button>
			</section> }
			{ visible && <AddNote onClose={() => setVisible(false)} onCompletion={(error) => { 
				if(!error)
					setVisible(false)

				setCompleted(true)
				setStatus(error)
				setTimeout(() => { setCompleted(false) }, 3000)
			}
			}/> }
			<NoteList/>
			<Notification error={status} open={completed}>
				{status ? "Error: something went wrong": "Succesfully added"}
			</Notification>
		</Content>
	)	
}

export default main
