import { createSlice } from '@reduxjs/toolkit'

export interface User {
	id: string | null
	email: string | null
	fullName: string | null
}

interface AuthState {
	user: User
	token?: string | null
}

const initialState: AuthState = {
	user: { id: null, email: null, fullName: null },
	token: null,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: () => initialState,
		userInfo: (state, action) => {
			const { payload } = action
			state.user = payload
		},
		saveJwt: (state, action) => {
			const { payload } = action
			localStorage.setItem('accessToken', payload)
			state.token = payload
		},
	},
})

export const { logout, userInfo, saveJwt } = authSlice.actions

export default authSlice.reducer
