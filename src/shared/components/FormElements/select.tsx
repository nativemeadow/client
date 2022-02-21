import React from 'react';

type selections = {
	options: [{ option: string | number; value: string | number }];
	defaultValue: string | number;
	onChange: () => {};
};

function select(props: selections) {
	return (
		<select onChange={props.onChange} defaultValue={props.defaultValue}>
			{props.options.map((option) => {
				return <option value={option.value}>{option.option}</option>;
			})}
		</select>
	);
}

export default select;
