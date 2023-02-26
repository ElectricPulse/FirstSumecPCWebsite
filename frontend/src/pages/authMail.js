import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Content from '/components/Content'
import Notification from '/components/Notification'
import styles from './authMail.module.css'
import './common.css'

const about = () => {
	const { token } = useParams()
	const notificationRef = useRef()
	
	useEffect(() => {	
		const xhr = new XMLHttpRequest()
		xhr.open("GET", `/api/authMail/${token}`, true)
		xhr.setRequestHeader("Content-Type", "application/json")

		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4)
				if(xhr.status === 201)
					notificationRef.current.notify( "Mail succesfully authenticated", false)
				else
					notificationRef.current.notify("Failed to authneticate mail", true)
		}
		xhr.send()
	}, [])

	return (
		<Content>
			<Notification ref={notificationRef}/>
		</Content>
	)	
}

export default about
