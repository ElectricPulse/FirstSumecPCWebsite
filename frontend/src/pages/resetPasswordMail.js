import React, { useRef } from 'react'

import Content from '/components/Content'
import Notification from '/components/Notification'
import ResetPasswordMail from '/components/ResetPasswordMail'
import styles from './resetPasswordMail.module.css'
import './common.css'

const main = () => {
	const notificationRef = useRef()
	return (
		<Content name={styles.index}>
			<ResetPasswordMail onCompletion={(error) => notificationRef.current.notify(error ? "Something went wrong, couldnt send mail": "Sucessfully sent mail", error)}/>
			<Notification ref={notificationRef}/>
		</Content>
	)	
}

export default main
