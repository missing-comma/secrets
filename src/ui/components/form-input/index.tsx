import React from 'react';
import { Persisted } from '../persisted/index.js';
import { ReadlineResolver } from './components/readline-resolver.js';

export interface IFormInput<V = string> {
	placeholder: string;
	label: string;
	parse?: (value: string) => V;
	onSet(value: V): void;
}

export const FormInput = <V extends any = string>(props: IFormInput<V>) => {
	const parse = props.parse || String;

	return (
		<ReadlineResolver
			{...props}
			onSubmit={(value) => {
				const parsed = parse(value) as V;
				props.onSet(parsed);
			}}
		/>
	);
	return <Persisted>{''}</Persisted>;
};
