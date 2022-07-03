import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import httpFetch from '../../shared/http/http-fetch';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { FormInput } from '../../shared/interfaces/user';
import ProfileInformation from './profile-information';
import configData from '../../config.json';

import classes from './create-user.module.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Registration() {
	const navigate = useNavigate();
	const location = useLocation();
	const [error, setError] = useState<string | null>(null);
	const [inputVal, setInputVal] = useState<FormInput>({
		username: '',
		password: '',
		passwordConfirmation: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		country: 'US',
		state: 'CA',
		postalCode: '',
		company: '',
	});
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = event.target.value;
		const name = event.target.name;
		setInputVal({ ...inputVal, [name]: val });
	};

	const selectChangeHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {};

	const createUserHandler = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		console.log('Create User');
		console.log(inputVal);
		const headers = { 'Content-Type': 'application/json' };

		try {
			const responseData: any = await httpFetch(
				`${configData.BACKEND_URL}/auth/signup`,
				'POST',
				JSON.stringify(inputVal),
				headers
			);
			console.log(responseData);
			if (!responseData.message) {
				navigate('/login', {
					state: { replace: true, from: location },
				});
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
			<div className={classes['reg-login__container']}>
				<h1 className={classes['reg-login__heading']}>
					Create Your Account
				</h1>
				<h2 className={classes['reg-login__company-heading']}>
					Login Information
				</h2>
				<form name='create-user' onSubmit={createUserHandler}>
					<div className={classes['reg-login-information']}>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='username'>
								Username
							</label>
							<input
								type='text'
								id='username'
								name='username'
								value={inputVal.username}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='password'>
								Password
							</label>
							<input
								className='textbox'
								type='password'
								id='password'
								name='password'
								value={inputVal.password}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='passwordConfirmation'>
								Password (Confirm)
							</label>
							<input
								className='textbox'
								type='password'
								id='passwordConfirmation'
								name='passwordConfirmation'
								value={inputVal.passwordConfirmation}
								onChange={changeHandler}
							/>
						</div>
					</div>
					<ProfileInformation
						inputVal={inputVal}
						changeHandler={changeHandler}
						selectChangeHandler={selectChangeHandler}
					/>
				</form>
			</div>
		</>
	);
}
