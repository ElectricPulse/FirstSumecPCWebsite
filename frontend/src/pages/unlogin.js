import React, { useRef, useEffect } from 'react'
import { useDispatch } from '/store'
import Content from '/components/Boilerplate/Content'
import Notification from '/components/Notification'
import Login from '/components/Account/Login'
import styles from './register.module.css'
import './common.css'

const main = () => {
	const notificationRef = useRef()
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch("UNSET_TOKEN")
	}, [])

	return (
		<Content name={styles.index}>
			Boli ste úspešne odhlásený
		</Content>
	)	
}

export default main
