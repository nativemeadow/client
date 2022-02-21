import { createContext } from 'react';

export interface AuthContextIf {
	isLoggedIn: boolean;
	userId: string | null;
	firstName: string | null;
	lastName: string | null;
	token: boolean | null;
	login: (
		uid: string | null,
		firstName: string | null,
		lastName: string | null,
		token: boolean,
		expirationData?: Date | null
	) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextIf>({
	isLoggedIn: false,
	userId: null,
	firstName: null,
	lastName: null,
	token: false,
	login: () => {},
	logout: () => {},
});
