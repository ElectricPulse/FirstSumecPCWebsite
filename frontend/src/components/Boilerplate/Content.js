import React, {useEffect, useRef} from 'react'
import styles from './Content.module.css'
import { useDispatch } from '/store.js'

import Footer from './Footer'
import Navbar from './Navbar'
import Notification from '/components/Notification'

function main(props) {
	const dispatch = useDispatch()
	const notificationRef = useRef()

	useEffect(() => {
		dispatch('SET_NOTIFY_CALLBACK', (message, error) => notificationRef.current.notify(message, error))
	},[])

	return (
		<>	
			<Navbar/>
				<Notification ref={notificationRef}/>
				<div className={[props.className, styles.content].join(' ')}>
				{props.children}
				</div>
			<Footer/>
		</>
	)
}

export default main
