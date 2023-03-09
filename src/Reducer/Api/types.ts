export interface LoginDto {
	username: string
	password: string
}

export interface RegisterDto {
	fullName: string
	email: string
	password: string
}

export interface ILoginResponse {
	access_token: string
}

export interface UserAuthData {
	id: string
	token: string
}
