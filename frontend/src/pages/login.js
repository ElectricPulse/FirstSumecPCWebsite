import React, { useRef } from 'react'
import { useNavigate } from 'react-router'
import Content from '/components/Content'
import Notification from '/components/Notification'
import Login from '/components/Login'
import styles from './register.module.css'
import './common.css'

const main = () => {
	const notificationRef = useRef()
	const navigate = useNavigate()
	function completionHandler(error) {
		if(error)
			notificationRef.current.notify("Something went wrong, couldnt login", true)
		else 
			navigate('/')
	}
	return (
		<Content name={styles.index}>
			<Login onCompletion={completionHandler}/>
			<Notification ref={notificationRef}/>
		</Content>
	)	
}

export default main
