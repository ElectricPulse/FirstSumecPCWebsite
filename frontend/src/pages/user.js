import React from 'react'
import Content from '/components/Content'
import User from '/components/User'
import styles from './user.module.css'
import './common.css'


function main() {
	return (
		<Content styles={styles.page}>
			<User/>
		</Content>
	)
}

export default main
