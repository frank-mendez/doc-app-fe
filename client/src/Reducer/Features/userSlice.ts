import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
	id: string | null
	email: string | null
	fullName: string | null
}

const initialState: UserState = {
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
			;(state.email = payload.email), (state.fullName = payload.fullName)
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
