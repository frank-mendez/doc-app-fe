import { createSlice } from '@reduxjs/toolkit'

export interface User {
	id: string | null
	email: string | null
	fullName: string | null
}

interface AuthState {
	token?: string | null
}

const initialState: AuthState = {
	token: null,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: () => initialState,
		saveJwt: (state, action) => {
			const { payload } = action
			localStorage.setItem('accessToken', payload)
			state.token = payload
		},
	},
})

export const { logout, saveJwt } = authSlice.actions

export default authSlice.reducer
