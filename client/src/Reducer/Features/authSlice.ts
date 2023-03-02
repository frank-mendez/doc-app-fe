import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
	_id: string
	email: string
	fullName: string
}

interface AuthState {
	user?: IUser | null
	token?: string | null
}

const initialState: AuthState = {
	user: null,
	token: null,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: () => initialState,
		userInfo: (state, action: PayloadAction<AuthState>) => {
			state.user = action.payload.user
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
