import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	token: '',
	user: {},
}

const fetchUser = createAsyncThunk('auth/fetchRandomUser', async () => {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', '/api/user', true)
	xhr.setRequestHeader('Authorization', store.token)
	
	const data = {}
	await new Promise((resolve, reject) => {
		xhr.onreadystatechange = function() {
			if(this.readyState === 4 && this.status == 200) {
				data = JSON.parse(this.responseText)
			}
		}
	})
		
	xhr.send()
	return data
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken(state, action) {
			state.token='Bearer ' + action.value
			localStorage.setItem('token', action.value)
		}

		unsetToken(state, action) {
			localStorage.clear("token")
			state.token = ''
			state.user = {} 
		}
	}

	extraReducers: {
		[fetchUser.fulfilled]: (state, action) => {
			state.user = action.payload
		}		
	}
})

export const actions = counterSlice.actions
const store = configureStore({
	reducer: userSlice.reducer
})
