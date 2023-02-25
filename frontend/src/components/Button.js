import React from 'react'
import styles from './Button.module.css'

function main(props) {
	const common = {
		className: [styles.button, props.className || ''].join(' ')
	}

	return props.submit ? 	
			<input {...common} type="submit"/>  : 
			<button {...common} onClick={props.onClick}>{props.children}</button>		
}

export default main
