import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { statesProvinces, countries } from '../../shared/util/location-lookup';
import { FormInput } from '../../shared/interfaces/user';

import classes from './create-user.module.css';

interface Props {
	inputVal: any;
	errors?: any;
	changeHandler: (
		event: ChangeEvent<HTMLInputElement & HTMLSelectElement>
	) => void;
	selectChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const ProfileInformation: React.FC<Props> = ({
	inputVal,
	errors,
	changeHandler,
	selectChangeHandler,
	onBlurHandler,
}) => {
	return (
		<>
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
						onBlur={onBlurHandler}
					/>
					<div className={classes['required']}>*</div>
					{errors.firstName && (
						<p
							className={`error col-span-2 ${classes['error-message']}`}>
							{errors.firstName}
						</p>
					)}
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
						onBlur={onBlurHandler}
					/>
					<div className={classes['required']}>*</div>
					{errors.lastName && (
						<p
							className={`error col-span-2 ${classes['error-message']}`}>
							{errors.lastName}
						</p>
					)}
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
						onBlur={onBlurHandler}
					/>
					<div className={classes['required']}>*</div>
					{errors.email && (
						<p
							className={`error col-span-2 ${classes['error-message']}`}>
							{errors.email}
						</p>
					)}
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
								<option key={index} value={country.code}>
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
						{statesProvinces[0].states.map((state, index) => {
							return (
								<option key={index} value={state.abbreviation}>
									{state.name}
								</option>
							);
						})}
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
				<button className={classes['reg-login__button']} type='submit'>
					Continue
				</button>
			</div>
		</>
	);
};

export default ProfileInformation;
