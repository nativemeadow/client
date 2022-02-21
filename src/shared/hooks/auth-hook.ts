import { useState, useCallback, useEffect } from 'react';

let logoutTimer: any;

export const useAuth = () => {
	const [token, setToken] = useState<boolean | null>(false);
	const [tokenExpirationDate, setTokenExpirationDate] =
		useState<Date | null>();
	const [userId, setUserId] = useState(null);

	const login = useCallback((uid, token, expirationDate?) => {
		setToken(token);
		setUserId(uid);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		try {
			localStorage.setItem(
				'userData',
				JSON.stringify({
					userId: uid,
					token: token,
					expiration: tokenExpirationDate.toISOString(),
				})
			);
		} catch (err) {
			console.log(err);
		}

		console.log('localStorage: userData', localStorage.getItem('userData'));
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
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
		const storedData = localStorage.getItem('userData')
			? JSON.parse(localStorage.getItem('userData')!)
			: null;
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	return { userId, token, login, logout };
};
