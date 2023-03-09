import { createSlice } from '@reduxjs/toolkit'
import { JwtPayload } from 'jsonwebtoken'

export interface User {
	id: string | null | JwtPayload
	email: string | null | JwtPayload
	fullName: string | null | JwtPayload
}

const initialState: User = {
	id: null,
	email: null,
	fullName: null,
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { payload } = action
			state.id = payload.id
			state.email = payload.email
			state.fullName = payload.fullName
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
