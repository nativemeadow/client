import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

type action = {
	type: string;
	value: string | number;
	validation: any;
};

const inputReducer = (state: any, action: action) => {
	switch (action.type) {
		case 'CHANGE':
			return { ...state, value: action.value, isValid: true };
		default:
			return state;
	}
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	element: string;
	type: string;
	name: string;
	value: string;
	label: string;
	errorText: string;
	placeholder: string;
	rows?: number;
}

const Input: React.FC<Props> = (props: Props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: '',
		isValid: false,
	});
	// const { value, isValid } = inputState;

	const changeHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		dispatch({
			type: 'CHANGE',
			value: event.target.value,
			validation: null,
		});
	};

	const touchHandler = (
		event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {};

	const formElement =
		props.element === 'input' ? (
			<input
				id={props.name}
				type={props.type}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={props.name}
				rows={props.rows || 3}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		);

	return (
		<div
			className={`form-control ${
				!inputState.isValid &&
				inputState.isTouched &&
				'form-control--invalid'
			}`}>
			<label htmlFor={props.id}>{props.label}</label>
			{formElement}
			{!inputState.isValid && inputState.isTouched && (
				<p>{props.errorText}</p>
			)}
		</div>
	);
};

export default Input;
