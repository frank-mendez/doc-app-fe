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
		setAuthUser: (state, action) => {
			const { payload } = action
			localStorage.setItem('accessToken', payload.access_token)
			localStorage.setItem('userId', payload.id)
			state.token = payload
			state.isAuthenticated = true
		},
	},
})

export const { logout, setAuthUser } = authSlice.actions

export default authSlice.reducer
