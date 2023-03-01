import React, { useState, useEffect } from 'react'
import { useSelector } from '/store.js'

function main() {
	const [notes, setNotes] = useState()
	const store = useSelector(s => s)

	useEffect(() => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/listUserNotes', true)
		xhr.setRequestHeader('Authorization', store.token)
		xhr.onreadystatechange = function() {
			if(this.readyState === 4 && this.status == 200) 
				setNotes(JSON.parse(this.responseText))
		}
		xhr.send()
	}, [])

	return (
		<div>	
			{store.user.email}
			{store.user.username}

		</div>
	)
}

export default main
