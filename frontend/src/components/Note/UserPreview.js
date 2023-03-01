import React from 'react'
import { Link } from 'react-router-dom'
import styles from './UserPreview.module.css'

import getTimeDifference from '/utils/getTimeDifference'

const Note = (props) => {
	const note = props.note
	return (
		<li className={styles.container}>
		<div className={styles.title}> 
			<h3>{note.name}</h3>	
			<h3>{note.subject}</h3>	
		</div>
		<div className={styles.noteContainer}>
			<div className={styles.note}>
				<div className={styles.description}> 
				<div> 
					Autor: {note.author}
				</div>
				<div>
					Dátum hodiny: pred {getTimeDifference(note.date)} dňami
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
			<hr className={styles.horizontalRuler}/>
			<div className={styles.buttonContainer}>
				<Link className={styles.images} to={"/note/" + note.id}>
					<button className={styles.button}>Viac</button>
				</Link>
				<button onClick={props.onDelete} className={styles.deleteButton}>Delete</button>
			</div>
		</div>
		</li>

	)
}

export default Note
