export type Menu = {
	name: string
	path: string
	icon: string
}

export const userMenu: Menu[] = [
	{
		name: 'Home',
		path: '/',
		icon: 'ri-home-smile-line',
	},
	{
		name: 'Appointments',
		path: '/appoitments',
		icon: 'ri-calendar-todo-line',
	},
	{
		name: 'Apply Doctor',
		path: '/apply-doctor',
		icon: 'ri-stethoscope-line',
	},
	{
		name: 'Profile',
		path: '/profile',
		icon: 'ri-profile-line',
	},
	{
		name: 'Logout',
		path: '/logout',
		icon: 'ri-logout-box-line',
	},
]
