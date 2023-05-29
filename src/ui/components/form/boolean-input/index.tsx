import React from 'react';
import { IFormSelectorProps } from '../select/types.js';
import { FormSelect } from '../select/index.js';
import chalk from 'chalk';

type Option = FormSelect.InputOption<boolean>;
export interface IBooleanInputProps
	extends Omit<IFormSelectorProps<boolean>, 'extractKey' | 'extractLabel' | 'options'> {}

const makeOption = FormSelect.makeOption<boolean>();
const OPTIONS = [
	makeOption({ value: true, label: chalk.cyan('Yes') }),
	makeOption({ value: false, label: chalk.cyan('No') }),
];

const extractKey = (option: Option) => option.key;
const extractLabel = (option: Option) => option.label;

export const BooleanInput: React.FC<IBooleanInputProps> = (props) => {
	return (
		<>
			<FormSelect<Option>
				{...props}
				inline
				onChange={(selected) => props.onChange(selected.value)}
				options={OPTIONS}
				selected={OPTIONS.find((opt) => opt.value === props.selected) ?? null}
				extractKey={extractKey}
				extractLabel={extractLabel}
			/>
		</>
	);
};
