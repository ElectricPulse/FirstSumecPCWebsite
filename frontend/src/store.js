import React, { useState, useEffect, useRef } from 'react'
import copyDeep from '/utils/copyDeep'
import compareDeep from '/utils/compareDeep'

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

let state, stateOld
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


function notify(oldState) {
	for(const callback of subscribers) {	
		callback(oldState)
	}
}

function dispatch(action, payload) {
	stateOld = copyDeep(state)
	switch(action) {
		case "SET_TOKEN":
			localStorage.setItem('token', payload)
			const token = 'Bearer ' + payload
			state.token = token
			fetchUser(token).then((user) => { state.user = user; notify(stateOld) })
			break
		case "UNSET_TOKEN":
			state.token = ""
			state.user = {}
			localStorage.removeItem('token')
			notify(stateOld)
			break
		}
}

export function useDispatch() {
	return dispatch
}

export function useSelector(selector) {
	const [change, setChange] = useState(false)

	useEffect(() => {
			return subscribe(oldState => {
				if(!compareDeep(selector(oldState), selector(state))) 
					setChange((prev) => !prev);
		})
	}, [])

	return selector(state)
}

