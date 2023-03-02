import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/users` }),
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
