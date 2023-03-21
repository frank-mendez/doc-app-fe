import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginDto, ResetPasswordDto } from './types'

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
		forgotPassword: builder.mutation({
			query: (payload: { email: string }) => ({
				url: '/email/forgot-password/',
				method: 'POST',
				body: payload,
			}),
		}),
		resetPassword: builder.mutation({
			query: (payload: ResetPasswordDto) => ({
				url: '/email/reset-password',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
})

export const { useSubmitLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi
