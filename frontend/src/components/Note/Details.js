import React, { useState, useRef } from 'react'
import styles from './Details.module.css'

import Gallery from '/components/Gallery'
import Image from '/components/Image'

const main = ({note}) => {
	const [ imageVis, setImageVis ] = useState(false)
	const imageIndex = useRef()

	function openImage(index) {
		setImageVis(true)
		imageIndex.current = index
	}	

	return (
		<>
		<section className={styles.container}>
			<div className={styles.title}> 
				<h3>{note.name}</h3>	
				<h3>{note.subject}</h3>	
			</div>
			<div className={styles.note}>
				<div className={styles.description}>
					Autor: {note.author}
				</div>
				<div>
					Dátum hodiny: {note.date}
				</div>
				<div>
					Popis: {note.description}
				</div>
				<ul className={styles.image}>
				{
					note.images.map((image, index) => {
						return (
						<Image 
							key={image} 
							onClick={() => openImage(index)} 
							name={image}
						/>
						)
					})
				}
				</ul>
				</div>
		</section>
		<Gallery 
			onExit={() => setImageVis(false)} 
			open={imageVis} 
			index={imageIndex.current}
			images={note.images} 
			onLeft={() => --imageIndex.current} 
			onRight={() => ++imageIndex.current}
		/>
		</>
	)
}

export default main
