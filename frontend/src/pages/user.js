import React from 'react'
import Content from '/components/Boilerplate/Content'
import User from '/components/Account/User'
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
