import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterDto, UserAuthData } from './types'

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
		registerUser: builder.mutation({
			query: (payload: RegisterDto) => ({
				url: '/',
				method: 'POST',
				body: payload,
			}),
		}),
		getUserDetails: builder.mutation({
			query: (payload: UserAuthData) => ({
				url: `/details/${payload.id}`,
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			}),
		}),
	}),
})

export const { useGetUsersQuery, useRegisterUserMutation, useGetUserDetailsMutation } = userApi
