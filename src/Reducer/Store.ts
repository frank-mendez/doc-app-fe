import { doctorApi } from './Api/DoctorApi'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './Api/AuthApi'
import { userApi } from './Api/UserApi'
import authReducer from './Features/authSlice'
import userReducer from './Features/userSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[doctorApi.reducerPath]: doctorApi.reducer,
	authUser: authReducer,
	userDetails: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([authApi.middleware, userApi.middleware, doctorApi.middleware]),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)

setupListeners(store.dispatch)
