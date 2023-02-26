import React, { useState, useEffect } from 'react'

function main() {
	const [user, setUser] = useState()

	useEffect(() => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/user', true)
			xhr.setRequestHeader('Authorization', token)
			xhr.onreadystatechange = function() {
				if(this.readyState === 4 && this.status == 200) {				setUser(JSON.parse(this.responseText))
			}
	}, [])

	return (
		<div>	
			{user.email}
			{user.username}
		</div>
	)
}

export default main
