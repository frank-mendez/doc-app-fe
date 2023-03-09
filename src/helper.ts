import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { verify } from 'jsonwebtoken'
import { UserAuthData } from './Reducer/Api/types'
import { User } from './Reducer/Features/userSlice'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
	return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
	return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string'
}

export const verifyToken = (token: string): boolean => {
	try {
		verify(token, process.env.REACT_APP_JWT_SECRET as string, (err) => {
			if (err) {
				throw new Error(err.message)
			}
		})
		return true
	} catch (error) {
		return false
	}
}

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem('accessToken')
	return token ? verifyToken(token) : false
}

export const userAuthData = (): UserAuthData | null => {
	const token = localStorage.getItem('accessToken')
	const userId = localStorage.getItem('userId')

	if (token && userId && verifyToken(token)) {
		return {
			id: userId,
			token: token,
		}
	}

	return null
}

export interface ValidatedUser {
	user: User
	isAuthenticated: boolean
}
