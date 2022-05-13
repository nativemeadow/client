import { createContext } from 'react';

export interface AuthContextIf {
	isLoggedIn: boolean;
	userId: string | null;
	token: boolean | null;
	login: (
		uid: string | null,
		token: boolean,
		expirationData?: Date | null
	) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextIf>({
	isLoggedIn: false,
	userId: null,
	token: false,
	login: () => {},
	logout: () => {},
});
