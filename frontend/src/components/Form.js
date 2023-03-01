import React, {useEffect, useState, useRef} from 'react'
import styles from './Form.module.css'

import Button from '/components/Button'

//The whole point of this component at the moment is to check that the input fields are empty
//I am aware that the DOM manipulations are very unlike react

function main({children, className, ...props}) {
	const [disabled, setDisabled] = useState(true)
	const inputs = useRef([])
	const formRef = useRef() 

	function changeHandler(event) {
		for(const input of inputs.current)
			if(input.value.trim() === '') {
				setDisabled(true)
				return
			}

		setDisabled(false)
	}

	useEffect(() => {
		const elements = formRef.current.querySelectorAll('input[required]')
		for(const element of elements) {
			element.addEventListener('change', changeHandler)
			inputs.current.push(element)
		}
	}, [children])
	
	return (
		<form ref={formRef} className={[styles.form, className].join(' ')} {...props}>
			{children}
			<Button disabled={disabled} submit/>
		</form>
	)
}

export default main
