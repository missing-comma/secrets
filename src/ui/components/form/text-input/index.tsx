import React from 'react';
import { ReadlineResolver } from './readline-resolver.js';
import { Persisted } from '../../persisted/index.js';

export interface IFormInput<V = string> {
	default: string;
	label: string;
	parse?: (value: string) => V;
	onSet(value: V): void;
}

export const TextInput = <V extends any = string>(props: IFormInput<V>) => {
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
