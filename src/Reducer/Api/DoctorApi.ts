import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApplyDoctorAccountDto } from './types'

export const doctorApi = createApi({
	reducerPath: 'doctorApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_AWS_API_URL}/doctors` }),
	tagTypes: ['Doctors'],
	endpoints: (builder) => ({
		applyDoctorAccount: builder.mutation({
			query: (payload: ApplyDoctorAccountDto) => ({
				url: '/apply-doctor',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
				method: 'POST',
				body: payload,
			}),
		}),
	}),
})

export const { useApplyDoctorAccountMutation } = doctorApi
