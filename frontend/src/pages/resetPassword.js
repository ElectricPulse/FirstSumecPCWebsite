import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import Content from '/components/Content'
import Notification from '/components/Notification'
import ResetPassword from '/components/ResetPassword'
import styles from './resetPasswordMail.module.css'
import './common.css'

const main = (props) => {
	const notificationRef = useRef()
	const { token } = useParams()
	return (
		<Content name={styles.index}>
			<ResetPassword token={token} onCompletion={(error) => notificationRef.current.notify(error ? "Something went wrong, couldnt send mail": "Sucessfully sent mail", error)}/>
			<Notification ref={notificationRef}/>
		</Content>
	)	
}

export default main
