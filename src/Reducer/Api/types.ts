export interface LoginDto {
	username: string
	password: string
}

export interface ResetPasswordDto {
	email: string
	newPassword: string
	newPasswordToken: string
	currentPassword?: string | null
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
