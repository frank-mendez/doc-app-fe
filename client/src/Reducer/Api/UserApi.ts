import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/users', mode: 'no-cors' }),
	tagTypes: ['Users'],
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => ({
				url: '/',
			}),
		}),
	}),
})

export const { useGetUsersQuery } = userApi
