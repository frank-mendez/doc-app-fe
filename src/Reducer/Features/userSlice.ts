import { createSlice } from '@reduxjs/toolkit'
import { JwtPayload } from 'jsonwebtoken'

export interface User {
	id: string | null | JwtPayload
	email: string | null | JwtPayload
	firstName: string | null | JwtPayload
}

const initialState: User = {
	id: null,
	email: null,
	firstName: null,
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		removeUser: () => initialState,
		setUser: (state, action) => {
			const { payload } = action
			state.id = payload.data.id
			state.email = payload.data.email
			state.firstName = payload.data.firstName
		},
	},
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
