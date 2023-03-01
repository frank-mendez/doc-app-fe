import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './Api/AuthApi'
import authReducer from './Features/authSlice'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		authUser: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware]),
	devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)
