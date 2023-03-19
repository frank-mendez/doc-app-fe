import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginDto } from './types'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_AWS_API_URL}/auth/`,
	}),
	endpoints: (builder) => ({
		submitLogin: builder.mutation({
			query: (payload: LoginDto) => ({
				url: 'login',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
})

export const { useSubmitLoginMutation } = authApi
