import React, { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useNotify } from '/store.js'

import Content from '/components/Boilerplate/Content'
import Login from '/components/Account/Login'
import styles from './register.module.css'
import './common.css'

const main = () => {
	const navigate = useNavigate()
	const notify = useNotify()

	function completionHandler(error) {
		if(error)
			notify("Something went wrong, couldnt login - maybe wrong password", true)
		else 
			navigate('/')
	}
	return (
		<Content name={styles.index}>
			<Login onCompletion={completionHandler}/>
		</Content>
	)	
}

export default main
