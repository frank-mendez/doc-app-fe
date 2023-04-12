import { createSlice } from '@reduxjs/toolkit'

export interface User {
	id: string | null
	email: string | null
	firstName: string | null
	unseenNotifications: any
	seenNotifications: any
}

const initialState: User = {
	id: null,
	email: null,
	firstName: null,
	unseenNotifications: [],
	seenNotifications: [],
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
		setUnseenNotifications: (state, action) => {
			const { payload } = action
			console.log('payload', payload)
			state.unseenNotifications = payload
		},
		setSeenNotifications: (state, action) => {
			const { payload } = action
			state.seenNotifications = payload
		},
	},
})

export const { setUser, removeUser, setUnseenNotifications, setSeenNotifications } = userSlice.actions

export default userSlice.reducer
