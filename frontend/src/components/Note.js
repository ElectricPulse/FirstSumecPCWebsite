import React from 'react'

const Note = (props) => {
	return (
		<li>
			<div>
				Predmet: {props.subject}
			</div>
			<div> 
				Author: {props.author}
			</div>
			<div>
				Date: {props.date}
			</div>
			<div>
				Nazov: {props.name}
			</div>
		</li>
	)
}

export default Note
