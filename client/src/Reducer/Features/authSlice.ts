import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
	_id: string
	email: string
	fullName: string
}

interface AuthState {
	user?: IUser | null
}

const initialState: AuthState = {
	user: null,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: () => initialState,
		userInfo: (state, action: PayloadAction<AuthState>) => {
			state.user = action.payload.user
		},
	},
})

export const { logout, userInfo } = authSlice.actions

export default authSlice.reducer
