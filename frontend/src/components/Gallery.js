import React from 'react'
import styles from 'Gallery.module.css'



function Arrow(props) { 
         return ( 
                 <div className={styles.arrowContainer} onClick={props.onClick}>  
                         <img className={props.left ? styles.leftArrow : styles.rightArrow} src="/api/images/arrow.svg"/> 
                 </div> 
         ) 
}

function Gallery(props) {
	const {renderRight, renderLeft} = props
	return (
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
	)
}

function main(props) {
	const renderLeft = !(props.index - 1 < 0)
	const renderRight = !(props.index + 1 >= props.images.length)

	return createPortal(
	<>
	{props.open && <Dialog renderLeft={renderLeft} renderRight={renderRight}/>}
	</> 
	,document.getElementById('app')
	)
}

