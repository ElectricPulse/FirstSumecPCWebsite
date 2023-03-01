import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Preview.module.css'

import Image from '/components/Image'

import getTimeDifference from '/utils/getTimeDifference'

function  main({note}) {
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
				<Link to={"/note/" + note.id}>
					<ul className={styles.images}>
					{
						note.images.map((image) => <Image key={image} name={image}/>)
					}
					</ul>
				</Link>
			</div>
			<hr className={styles.horizontalRuler}/>
			<div className={styles.buttonContainer}>
				<Link className={styles.images} to={"/note/" + note.id}>
					<button className={styles.button}>Viac</button>
				</Link>
			</div>
		</div>
		</li>

	)
}

export default main
