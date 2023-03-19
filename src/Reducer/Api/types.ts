export interface LoginDto {
	username: string
	password: string
}

export interface RegisterDto {
	firstName: string
	lastName: string
	email: string
	password: string
	address?: string
}

export interface ILoginResponse {
	access_token: string
}

export interface UserAuthData {
	id: string
	token: string
}
