import React from 'react'
import { createPortal } from 'react-dom'
import styles from './Gallery.module.css'

import Image from '/components/Image'

function Arrow(props) { 
         return ( 
                 <div className={styles.arrowContainer} onClick={props.onClick}>  
                         <Image className={props.left ? styles.leftArrow : styles.rightArrow} name="arrow.svg"/> 
                 </div> 
         ) 
}

function Dialog(props) {
	const renderLeft = !(props.index - 1 < 0)
	const renderRight = !(props.index + 1 >= props.images.length)
	return (
	<dialog open={props.open} className={styles.dialogContainer}>
		<div className={styles.overlay} onClick={props.onExit}></div>
		<div className={styles.dialog}>
		{renderLeft && 
			<Image 
				className={styles.leftImage}
				onClick={props.onLeft} 
				name={props.images[props.index-1]}
			/>
		}

		<div className={styles.center}>				
			{renderLeft && <Arrow left onClick={props.onLeft}/>}
			<Image 
				className={styles.centerImage}
				name={props.images[props.index]}
			/>
			{renderRight && <Arrow onClick={props.onRight}/>}
		</div>

		{renderRight && 
			<Image 
				className={styles.rightImage} 
				onClick={props.onRight} 
				name={props.images[props.index+1]}
			/>
		}
		</div>
	</dialog>
	)
}

function main(props) {
	return createPortal(
	<>
	{props.open && <Dialog {...props}/>}
	</> 
	,document.getElementById('app')
	)
}

export default main
