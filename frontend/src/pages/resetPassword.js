import React from 'react'
import { useNotify } from '/store.js'
import { useParams, useNavigate } from 'react-router-dom'
import Content from '/components/Boilerplate/Content'
import Notification from '/components/Notification'
import ResetPassword from '/components/Account/ResetPassword'
import styles from './resetPasswordMail.module.css'
import './common.css'

const main = (props) => {
	const { token } = useParams()
	const notify = useNotify()
	const navigate = useNavigate()
	return (
		<Content name={styles.index}>
			<ResetPassword token={token} onCompletion={(error) => {
				notify(error ? "Something went wrong, couldnt reset password": "Sucessfully changed password", error)
				setTimeout(() => navigate('/'), 3000)
				}}/>
		</Content>
	)	
}

export default main
