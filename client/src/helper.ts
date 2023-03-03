import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

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
		verify(token, 'secret_token', (err) => {
			if (err) {
				throw new Error(err.message)
			}
		})
		return true
	} catch (error) {
		return false
	}
}
