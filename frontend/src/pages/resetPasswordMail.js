import React from 'react'
import { useNotify } from '/store.js'
import Content from '/components/Boilerplate/Content'
import ResetPasswordMail from '/components/Account/ResetPasswordMail'
import styles from './resetPasswordMail.module.css'
import './common.css'

const main = () => {
	const notify = useNotify()
	return (
		<Content name={styles.index}>
			<ResetPasswordMail onCompletion={(error) => notify(error ? "Something went wrong, couldnt send mail": "Sucessfully sent mail", error)}/>
		</Content>
	)	
}

export default main
