import React, { useRef } from 'react'
import Content from '/components/Content'
import Notification from '/components/Notification'
import Login from '/components/Login'
import styles from './register.module.css'
import './common.css'

const main = () => {
	const notificationRef = useRef()
	return (
		<Content name={styles.index}>
			<Login onCompletion={(error) => notificationRef.current.notify(error ? "Something went wrong, couldnt login": "Sucessfully logged in", error)}/>
			<Notification ref={notificationRef}/>
		</Content>
	)	
}

export default main
