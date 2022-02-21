import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import { statesProvinces, countries } from '../../shared/util/location-lookup';
import httpFetch from '../../shared/http/http-fetch';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import configData from '../../config.json';
import { User } from '../../shared/interfaces/user';
import ProfileInformation from './profile-information';

import classes from './create-user.module.css';

type FormInput = Omit<User, 'username' | 'password' | 'passwordConfirmation'>;

export default function Profile() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [inputVal, setInputVal] = useState<FormInput>({
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

	useEffect(() => {});

	const selectChangeHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {};

	const updateUserHandler = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		console.log('Create User');
		console.log(inputVal);
		const headers = { 'Content-Type': 'application/json' };

		try {
			const responseData: any = await httpFetch(
				`${configData.BACKEND_URL}/auth/updateProfile`,
				'POST',
				JSON.stringify(inputVal),
				headers
			);
			console.log(responseData);
			if (!responseData.message) {
				navigate('/user/create-account-success');
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
					Update Your Account
				</h1>
				<form name='create-user' onSubmit={updateUserHandler}>
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
