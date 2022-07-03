import { useState, useCallback, useEffect } from 'react';

let logoutTimer: any;

export const useAuth = () => {
	const [token, setToken] = useState<boolean | null>(false);
	const [tokenExpirationDate, setTokenExpirationDate] =
		useState<Date | null>();
	const [userId, setUserId] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);

	const login = useCallback(
		(uid, firstName, lastName, token, expirationDate?) => {
			setToken(token);
			setFirstName(firstName);
			setLastName(lastName);
			setUserId(uid);
			const tokenExpirationDate =
				expirationDate ||
				new Date(new Date().getTime() + 1000 * 60 * 60);
			setTokenExpirationDate(tokenExpirationDate);
			try {
				sessionStorage.setItem(
					'userData',
					JSON.stringify({
						userId: uid,
						firstName: firstName,
						lastName: lastName,
						token: token,
						expiration: tokenExpirationDate.toISOString(),
					})
				);
			} catch (err) {
				console.log(err);
			}

			console.log(
				'sessionStorage: userData',
				sessionStorage.getItem('userData')
			);
		},
		[]
	);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		sessionStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const storedData = sessionStorage.getItem('userData')
			? JSON.parse(sessionStorage.getItem('userData')!)
			: null;
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.firstName,
				storedData.lastName,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	return { userId, firstName, lastName, token, login, logout };
};
