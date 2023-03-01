import React from 'react'

function main(props) {
	return (
		<img src={'/api/images/' + props.name} {...props}/>
	)
}

export default main
