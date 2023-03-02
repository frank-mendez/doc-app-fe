import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/auth/',
	}),
	endpoints: (builder) => ({
		submitLogin: builder.mutation({
			query: (payload) => ({
				url: 'login',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
})

export const { useSubmitLoginMutation } = authApi
