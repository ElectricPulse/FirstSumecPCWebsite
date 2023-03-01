import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import styles from './Notification.module.css'

const main = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState('')
	const [error, setError] = useState()

	useImperativeHandle(ref, () => ({
		notify(message, error) {
			setVisible(true)
			setOpen(true)

			setTimeout(() => {
				setVisible(false)
			}, 3000)

			setTimeout(() => {
				setOpen(false)
			}, 4000)

			setError(error)
			setContent(message)
		}
	}))
	
        return createPortal(
                <dialog open={open} data-visible={visible} className={[styles.notification, error ? styles.failure: styles.success].join(' ')}>{content}</dialog>
        , document.getElementById('app'))
})

export default main
