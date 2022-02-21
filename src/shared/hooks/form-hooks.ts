import { useReducer, useCallback } from 'react';

export type actionType = {
	type: string;
	inputId: string;
	inputs: string;
	value: string;
	isValid: boolean;
};

export type stateType = {
	inputs: [{ isValid: boolean }];
};

const formReducer = (state: stateType, action: actionType) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (!state.inputs[inputId]) {
					continue;
				}
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid,
					},
				},
				isValid: formIsValid,
			};
		case 'SET_DATA':
			return {
				inputs: action.inputs,
				isValid: action.isValid,
			};
		default:
			return state;
	}
};

// export const useForm = (initialInput: string, initialFormValidity: boolean) => {
// 	const [formState, dispatch] = useReducer(formReducer, {
// 		inputs: initialInput,
// 		isValid: initialFormValidity,
// 	});

// 	const inputHandler = useCallback((id, value, isValid) => {
// 		dispatch({
// 			type: 'INPUT_CHANGE',
// 			value: value,
// 			isValid: isValid,
// 			inputId: id,
// 		});
// 	}, []);

// 	const setFormData = useCallback((inputData, formValidity) => {
// 		dispatch({
// 			type: 'SET_DATA',
// 			inputs: inputData,
// 			formIsValid: formValidity,
// 		});
// 	}, []);

// 	return [formState, inputHandler, setFormData];
// };
