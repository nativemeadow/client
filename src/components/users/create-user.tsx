import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { statesProvinces, countries } from '../../shared/util/location-lookup';
import httpFetch from '../../shared/http/http-fetch';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { FormInput } from '../../shared/interfaces/user';
import configData from '../../config.json';

import classes from './create-user.module.css';

export default function Registration() {
	let navigate = useNavigate();
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
					<h2 className={classes['reg-login__name-address-heading']}>
						Name &amp; Address
					</h2>
					<div className={classes['reg-login-name-address']}>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='first_name'>
								First name
							</label>
							<input
								type='text'
								id='first_name'
								name='firstName'
								value={inputVal.firstName}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='last_name'>
								Last name
							</label>
							<input
								type='text'
								id='last_name'
								name='lastName'
								value={inputVal.lastName}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='phone'>
								Phone
							</label>
							<input
								type='text'
								id='phone'
								name='phone'
								value={inputVal.phone}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='email'>
								Email Address
							</label>
							<input
								type='text'
								id='email'
								name='email'
								value={inputVal.email}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='address'>
								Address
							</label>
							<input
								type='text'
								id='address'
								name='address'
								value={inputVal.address}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='city'>
								City
							</label>
							<input
								type='text'
								id='city'
								name='city'
								value={inputVal.city}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='country'>
								Country
							</label>
							<select
								className={classes['reg-login__select']}
								id='country'
								onChange={selectChangeHandler}
								value={inputVal.country}
								name='country'>
								{countries.map((country, index) => {
									return (
										<option
											key={index}
											value={country.code}>
											{country.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='state'>
								State / Province
							</label>
							<select
								className={classes['reg-login__select']}
								id='state'
								onChange={selectChangeHandler}
								value={inputVal.state}
								name='state'>
								{statesProvinces[0].states.map(
									(state, index) => {
										return (
											<option
												key={index}
												value={state.abbreviation}>
												{state.name}
											</option>
										);
									}
								)}
							</select>
						</div>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='postal_code'>
								Postal Code
							</label>
							<input
								type='text'
								id='postal_code'
								name='postalCode'
								value={inputVal.postalCode}
								onChange={changeHandler}
							/>
						</div>
						<h2 className={classes['reg-login__company-heading']}>
							Company
						</h2>
						<div className={classes['reg-login-fields']}>
							<label
								className={classes['reg-login__label']}
								htmlFor='company'>
								Company
							</label>
							<input
								type='text'
								id='company'
								name='company'
								value={inputVal.company}
								onChange={changeHandler}
							/>
						</div>
						<button
							className={classes['reg-login__button']}
							type='submit'>
							Continue
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
