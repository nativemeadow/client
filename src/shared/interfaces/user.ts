export type FormInput = {
	username: '';
	password: '';
	passwordConfirmation: '';
	firstName: '';
	lastName: '';
	email: '';
	phone: '';
	address: '';
	city: '';
	country: '' | 'US';
	state: '' | 'CA';
	postalCode: '';
	company: '';
};

export interface User {
	username: string;
	password: string;
	passwordConfirmation: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	country: string | 'US';
	state: string | 'CA';
	postalCode: string;
	company: string;
}
