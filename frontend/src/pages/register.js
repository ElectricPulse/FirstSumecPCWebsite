import React from 'react'
import { useNotify } from '/store.js'
import Content from '/components/Boilerplate/Content'
import Notification from '/components/Notification'
import Register from '/components/Account/Register'
import styles from './register.module.css'
import './common.css'

const main = () => {
	const notify = useNotify()
	return (
		<Content name={styles.index}>
			<Register onCompletion={(error) => notify(error ? "Something went wrong, couldnt register (maybe email address is used)": "Sucessfully registered, check your email and verify next", error)}/>
		</Content>
	)	
}

export default main
