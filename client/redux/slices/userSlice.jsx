'use client'
import { createSlice } from '@reduxjs/toolkit'

const sessionUser =
	typeof window !== 'undefined'
		? JSON.parse(localStorage.getItem('user'))
		: undefined

const initialState = {
	value: {
		isAuth: sessionUser ? true : false,
		_id: sessionUser ? sessionUser._id : '',
		fullName: sessionUser ? sessionUser.fullName : '',
		token: sessionUser ? sessionUser.token : '',
		role: sessionUser ? sessionUser.role : '',
	},
}

export const user = createSlice({
	name: 'authUser',
	initialState,
	reducers: {
		logout: () => {
			localStorage.clear()
			return initialState
		},
		login: (state, action) => {
			const { _id, fullName, role, token } = action.payload
			const newStateValue = {
				...state.value,
				isAuth: true,
				_id: _id,
				fullName: fullName,
				token: token,
				role,
			}
			localStorage.setItem('user', JSON.stringify({ _id, fullName, role, token }))
			state.value = newStateValue
		},
	},
})

export const { login, logout } = user.actions

export default user.reducer
