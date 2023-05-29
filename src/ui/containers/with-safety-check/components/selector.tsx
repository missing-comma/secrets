import React from 'react';

import chalk from 'chalk';
import { FormSelect } from '../../../components/form/select/index.js';

type Option = FormSelect.InputOption<boolean>;
export interface IBooleanInputProps
	extends Omit<FormSelect.Props<boolean>, 'extractKey' | 'extractLabel' | 'options'> {}

const makeOption = FormSelect.makeOption<boolean>();
const OPTIONS = [
	makeOption({ value: true, label: chalk.red('Yes, I want to run this command on production') }),
	makeOption({ value: false, label: chalk.green('No, take me to safety') }),
];

const extractKey = (option: Option) => option.key;
const extractLabel = (option: Option) => option.label;

export const SafetyBooleanSelector: React.FC<IBooleanInputProps> = (props) => {
	return (
		<>
			<FormSelect<Option>
				{...props}
				onChange={(selected) => props.onChange(selected.value)}
				options={OPTIONS}
				selected={OPTIONS.find((opt) => opt.value === props.selected) ?? null}
				extractKey={extractKey}
				extractLabel={extractLabel}
				cols={2}
			/>
		</>
	);
};
