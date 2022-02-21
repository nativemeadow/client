import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import httpFetch from '../../shared/http/http-fetch';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import configData from '../../config.json';

import classes from './user-login.module.css';

type FormInput = {
	username: '';
	password: '';
};

export default function UserLogin() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [inputVal, setInputVal] = useState<FormInput>({
		username: '',
		password: '',
	});
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = event.target.value;
		const name = event.target.name;
		setInputVal({ ...inputVal, [name]: val });
	};

	const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('customer logging in');
		const headers = { 'Content-Type': 'application/json' };

		try {
			const responseData: any = await httpFetch(
				`${configData.BACKEND_URL}/auth/login`,
				'POST',
				JSON.stringify(inputVal),
				headers
			);
			console.log(responseData);
			if (!responseData.message) {
				auth.login(responseData.userId, responseData.token);
				// navigate('/user/create-account-success');
				navigate(-1);
			} else {
				setError(responseData.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 *
	 * @param errorList - comma separated list of server side generated errors.
	 * @returns JSX
	 * @todo: enhance the messaging so the server response code displays
	 *        above the error messages.
	 */
	function formatError(errorList: string | null) {
		let errorArray = errorList?.split(',');
		return errorArray?.map((error, key) => {
			return (
				<li key={key} className={classes['error__listItems']}>
					{error}
				</li>
			);
		});
	}

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
			<ErrorModal error={formatError(error)} onClear={errorHandler} />
			<div className={classes['login__container']}>
				<div className={classes['login__grid']}>
					<div className={classes['login__form']}>
						<form name='login-form' onSubmit={loginHandler}>
							<h2>Login</h2>
							<div>
								<label
									htmlFor='customer-username'
									className={classes['login__label']}>
									Username:
								</label>
								<input
									id='customer-username'
									className={classes['login__form--username']}
									type='text'
									name='username'
									value={inputVal.username}
									onChange={changeHandler}
								/>
							</div>
							<div>
								<label
									htmlFor='customer-password'
									className={classes['login__label']}>
									Password:
								</label>
								<input
									id='customer-password'
									className={classes['login__form--password']}
									type='password'
									name='password'
									value={inputVal.password}
									onChange={changeHandler}
								/>
							</div>
							<button
								className={classes['login__button']}
								type='submit'>
								Login
							</button>
						</form>
						<h4>Forgot your password</h4>
						[+]&nbsp;
						<Link
							className={classes['create-account__link']}
							to='/user/forgot-password'>
							Click here to reset you password.
						</Link>
					</div>

					<div className={classes['login__new-account']}>
						<h2>New Account Sign Up</h2>
						<p>
							If you do not have an online account, you can create
							one here.
						</p>
						<Link
							className={classes['create-account__button']}
							to='/user/create-account'>
							Sign Up
						</Link>
						<h4>Accounts Receivable?</h4>
						[+]&nbsp;
						<Link
							className={classes['create-account__link']}
							to='/user/create-account'>
							If you already have a credit account with us, sign
							up to access your existing Accounts Receivable
							account on-line
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
