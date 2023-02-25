import React, { useRef } from 'react'
import Content from '/components/Content'
import Notification from '/components/Notification'
import Register from '/components/Register'
import styles from './register.module.css'
import './common.css'

const main = () => {
	const notificationRef = useRef()
	return (
		<Content name={styles.index}>
			<Register onCompletion={(error) => notificationRef.current.notify(error ? "Something went wrong, couldnt register": "Sucessfully registered", error)}/>
			<Notification ref={notificationRef}/>
		</Content>
	)	
}

export default main
