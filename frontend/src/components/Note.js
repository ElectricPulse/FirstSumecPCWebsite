import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import styles from './Note.module.css'
import getTimeDifference from '/utils/getTimeDifference'
import Gallery from './Gallery'

const main = (props) => {
	const [ imageVis, setImageVis ] = useState(false)
	const [ imageIndex, setImageIndex ] = useState()

	function openImage(index) {
		setImageVis(true)
		setImageIndex(index)
	}	

	const note = props.note
	return (
		<>
		<div className={styles.container}>
		<div className={styles.title}> 
			<h3>{note.name}</h3>	
			<h3>{note.subject}</h3>	
		</div>
		<div className={styles.note}>
			<div className={styles.description}>
				Autor: {note.author}
			</div>
			<div>
				Dátum hodiny: pred {getTimeDifference(note.date)} dňami
			</div>
			<div>
				Popis: {note.description}
			</div>
			<Link className={styles.images} to={"/note/" + note.id}>
			{
				note.images.map((image, index) => <img key={image} onClick={() => openImage(index)} src={`/api/images/${image}`}/>)
			}
			</Link>
		</div>
		</div>
		<Gallery onExit={() => setImageVis(false)} 
			open={imageVis} index={imageIndex} images={note.images} 
			onLeft={() => setImageIndex(imageIndex-1)} onRight={() => setImageIndex(imageIndex+1)}
		/>
		</>
	)
}

export default main
