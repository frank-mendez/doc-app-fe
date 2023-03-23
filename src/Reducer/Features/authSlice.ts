import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
	token?: string | null
	isAuthenticated: boolean
	isAdmin: boolean
}

const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
	isAdmin: false,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: () => initialState,
		setAuthUser: (state, action) => {
			const { payload } = action

			localStorage.setItem('accessToken', payload.data.access_token)
			localStorage.setItem('userId', payload.data.id)
			state.token = payload.data.access_token
			state.isAuthenticated = true
			state.isAdmin = payload.data.isAdmin
		},
	},
})

export const { logout, setAuthUser } = authSlice.actions

export default authSlice.reducer
