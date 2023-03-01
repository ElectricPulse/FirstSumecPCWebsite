import React from 'react'
import { useNotify } from '/store.js'
import { useParams } from 'react-router-dom'
import Content from '/components/Boilerplate/Content'
import Notification from '/components/Notification'
import ResetPassword from '/components/Account/ResetPassword'
import styles from './resetPasswordMail.module.css'
import './common.css'

const main = (props) => {
	const { token } = useParams()
	const notify = useNotify()
	return (
		<Content name={styles.index}>
			<ResetPassword token={token} onCompletion={(error) => notify(error ? "Something went wrong, couldnt send mail": "Sucessfully sent mail", error)}/>
		</Content>
	)	
}

export default main
