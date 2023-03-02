import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './Api/AuthApi'
import { userApi } from './Api/UserApi'
import authReducer from './Features/authSlice'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		authUser: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, userApi.middleware]),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
