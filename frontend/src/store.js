import { createStore } from 'redux'

function reducer(state, action) {
	switch(action.type) {
		case "SET_TOKEN":
			const token='Bearer ' + action.value
			localStorage.setItem('token', action.value)
			return { ...state, token}
		case "UNSET_TOKEN":
			localStorage.clear("token")
			return { ...state, token: "" }

		case "SET_USER":
			return { ...state, user: action.value}
	}

	return { token: "", user: {email: ""} }
}

const store = createStore(reducer)

export default store


