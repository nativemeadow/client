import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import httpFetch from '../../shared/http/http-fetch';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { FormInput } from '../../shared/interfaces/user';
import ProfileInformation from './profile-information';
import { useForm } from '../../shared/hooks/use-form';
import { validations } from './create-user-validations';
import { User } from '../../shared/interfaces/user';
import InputComp from 'react-select/dist/declarations/src/components/Input';

import configData from '../../config.json';

import classes from './create-user.module.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const newUser: FormInput = {
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
};

export default function Registration() {
	const navigate = useNavigate();
	const location = useLocation();
	const [error, setError] = useState<string | null>(null);
	//const [inputVal, setInputVal] = useState<FormInput>(newUser);
	const {
		handleSubmit,
		handleChange,
		data: inputVal,
		setData: setInputVal,
		errors,
	} = useForm<User>(validations);

	const changeHandler = (
		event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
	) => {
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

		if (!handleSubmit(event)) {
			return;
		}

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

	const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
		const val = event.target.value;
		const name = event.target.name;
		setInputVal({ ...inputVal, [name]: val });
		console.log('input value:', name, ':', val);
		// handleFieldValidation(name);
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
							<div></div>
							<div className={classes['requested-label']}>
								Required
							</div>

							<div className={classes['required']}>*</div>
						</div>
						<div className={classes['reg-login-fields']}>
							<InputComp
								id='username'
								element='input'
								type='text'
								label='Username'
								value={inputVal.username}
								errorText='Please enter your user name.'
								placeholder='Username'
							/>
							{/* <label
								className={classes['reg-login__label']}
								htmlFor='username'>
								Username
							</label>
							<input
								type='text'
								id='username'
								name='username'
								value={inputVal.username}
								onChange={handleChange('username')}
								onBlur={onBlurHandler}
							/>
							<div className={classes['required']}>*</div>
							{errors.username && (
								<p
									className={`error col-span-2 ${classes['error-message']}`}>
									{errors.username}
								</p>
							)} */}
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
								onChange={handleChange('password')}
								onBlur={onBlurHandler}
							/>
							<div className={classes['required']}>*</div>
							{errors.password && (
								<p
									className={`col-span-2 text-right ${classes['error-message']}`}>
									{errors.password}
								</p>
							)}
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
								onChange={handleChange('passwordConfirmation')}
								onBlur={onBlurHandler}
							/>
							<div className={classes['required']}>*</div>
							{errors.passwordConfirmation && (
								<p
									className={`error col-span-2 ${classes['error-message']}`}>
									{errors.passwordConfirmation}
								</p>
							)}
						</div>
					</div>
					<ProfileInformation
						inputVal={inputVal}
						errors={errors}
						changeHandler={changeHandler}
						selectChangeHandler={selectChangeHandler}
						onBlurHandler={onBlurHandler}
					/>
				</form>
			</div>
		</>
	);
}
