import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useNotify } from '/store.js'
import Content from '/components/Boilerplate/Content'
import Notification from '/components/Notification'
import styles from './authMail.module.css'
import './common.css'

const about = () => {
	const { token } = useParams()
	const notify = useNotify()

	useEffect(() => {	
		const xhr = new XMLHttpRequest()
		xhr.open("GET", `/api/authMail/${token}`, true)
		xhr.setRequestHeader("Content-Type", "application/json")

		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				const status = xhr.status !== 201
				notify(status ? "Failed to authneticate mail": "Mail succesfully authenticated",status)
			}
		}
		xhr.send()
	}, [])

	return (
		<Content>	
		</Content>
	)	
}

export default about
