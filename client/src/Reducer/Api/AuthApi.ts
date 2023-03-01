import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginResponse } from './types'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}/auth` }),
	tagTypes: ['Login'],
	endpoints: (builder) => ({
		submitLogin: builder.mutation<ILoginResponse, FormData>({
			query: (payload) => ({
				url: '/login',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Login'],
			transformResponse: (result: { data: { login: ILoginResponse } }) => result.data.login,
		}),
	}),
})

export const { useSubmitLoginMutation } = authApi
