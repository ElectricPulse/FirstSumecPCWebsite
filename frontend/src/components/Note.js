import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import styles from './Note.module.css'

function getTime(date)  {
	const current = new Date()
	const noteDate = new Date(date)
	const diffTime = current - noteDate
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	return diffDays
}

function Arrow(props) {
	return (
		<div className={styles.arrowContainer} onClick={props.onClick}> 
			<img className={props.left ? styles.leftArrow : styles.rightArrow} src="/api/images/arrow.svg"/>
		</div>
	)
}

function GalleryDialog(props) {
	const renderLeft = !(props.index - 1 < 0)
	const renderRight = !(props.index + 1 >= props.images.length)
	return createPortal(
		<>
		{props.open && 
		<dialog open={props.open} className={styles.dialogContainer}>
			<div className={styles.overlay} onClick={props.onExit}></div>
			<div className={styles.dialog} >
				{renderLeft && <img className={styles.leftImage} onClick={props.onLeft} src={`/api/images/${props.images[props.index-1]}`}/>}
	
				<div className={styles.center}>				
					{renderLeft && <Arrow left onClick={props.onLeft}/>}
					<img className={styles.centerImage} src={`/api/images/${props.images[props.index]}`}/>
					{renderRight && <Arrow onClick={props.onRight}/>}
				</div>
	
				{renderRight && <img className={styles.rightImage} onClick={props.onRight} src={`/api/images/${props.images[props.index+1]}`}/>}
			</div>
		</dialog>
		} 
		</>,
		document.getElementById('app')
	)
}


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
		<li className={styles.container}>
		<div className={styles.title}> 
			<h3>{note.name}</h3>	
			<h3>{note.subject}</h3>	
		</div>
		<div className={styles.note}>
			<div className={styles.description}>
				Autor: {note.author}
			</div>
			<div>
				Dátum hodiny: pred {getTime(note.date)} dňami
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
		</li>
		<GalleryDialog onExit={() => setImageVis(false)} 
			open={imageVis} index={imageIndex} images={note.images} 
			onLeft={() => setImageIndex(imageIndex-1)} onRight={() => setImageIndex(imageIndex+1)}
		/>
		</>
	)
}

export default main
