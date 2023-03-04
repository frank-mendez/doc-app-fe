import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
	token?: string | null
	isAuthenticated: boolean
}

const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
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
			state.isAuthenticated = true
		},
	},
})

export const { logout, saveJwt } = authSlice.actions

export default authSlice.reducer
