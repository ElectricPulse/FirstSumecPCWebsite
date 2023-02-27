import React, { useState, useEffect, useRef } from 'react';

/////////
//Utils//
/////////
function fetchUser(token) {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', '/api/user', true)
	xhr.setRequestHeader('Authorization', token)
	
	return new Promise((resolve, reject) => {
		xhr.onreadystatechange = function() {
			if(this.readyState === 4) {
				if(this.status == 200) {
					const data = JSON.parse(this.responseText)
					resolve(data)
				} else
					reject()
			}
		}
		xhr.send()
	})
}
////////

let state
let subscribers

export function createStore() {
	state = {
		token: ' ',
		user: {}
	}
	subscribers = []
}

function subscribe(callback) {
	subscribers.push(callback)

	//check if I can convert this into function()
	return () => {
		subscribers.splice(subscribers.indexOf(callback), 1)
	}
}


function notify(newState) {
	for(const callback of subscribers) {	
		callback(newState)
	}
}

function dispatch(action, payload) {
	switch(action) {
		case "SET_TOKEN":
			localStorage.setItem('token', payload)
			const token = 'Bearer ' + payload
			state.token = token
			fetchUser(token).then((user) => { state.user = user; notify(state) })
			break
		case "UNSET_TOKEN":
			state.token = ""
			state.user = {}
			localStorage.removeItem('token')
			break
		}
	notify(state)
}

export function useDispatch() {
	return dispatch
}

function copy(object) {
	return JSON.parse(JSON.stringify(object))
}

export function useSelector(selector) {
	const data = useRef(selector(copy(state)))
	const [change, setChange] = useState(false)

	useEffect(() => {
			return subscribe(newState => {
				if(JSON.stringify(data.current) !== JSON.stringify(selector(newState)))
					setChange((prev) => !prev)

				data.current = selector(copy(newState))
		})
	}, [])

	return data.current
}

