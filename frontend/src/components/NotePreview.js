import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotePreview.module.css'
function getTime(date)  {
	const current = new Date()
	const noteDate = new Date(date)
	const diffTime = current - noteDate
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	return diffDays
}
const Note = (props) => {
	const note = props.note
	return (
		<li className={styles.container}>
		<div className={styles.title}> 
			<h3>{note.name}</h3>	
			<h3>{note.subject}</h3>	
		</div>
		<div className={styles.note}>
			<div className={styles.description}> 
			<div> 
				Autor: {note.author}
			</div>
			<div>
				Dátum hodiny: pred {getTime(note.date)} dňami
			</div>
			<div>
				Popis: {note.description}
			</div>
			</div>
			<Link className={styles.images} to={"/note/" + note.id}>
			{
				note.images.map((image) => <img key={image} src={`/api/images/${image}`}/>)
			}
			</Link>
		</div>
		</li>
	)
}

export default Note
