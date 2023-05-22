import React, { useEffect, useState } from 'react';
import { ReadlineResolver } from './readline-resolver.js';
import { Text } from 'ink';
import { Persisted } from '../../persisted/index.js';
export interface IFormInput<V = string> {
	readonly default: V;
	readonly label: string;
	readonly doneLabel?: string;
	readonly sensitive?: boolean;
	parse?: (value: string) => V;
	onSet(value: V): void;
}

interface OutputProps<V> extends IFormInput<V> {
	readonly value: string;
	onMount(): void;
}

const ShowOutput = <V extends any = string>(props: OutputProps<V>) => {
	useEffect(() => {
		setImmediate(() => {
			props.onMount();
		});
	}, []);

	if (props.sensitive) {
		return <Text>{props.doneLabel}</Text>;
	}

	return (
		<Text>
			{props.label}
			{': '}
			{String(props.value)}
		</Text>
	);
};

export const TextInput = <V extends any = string>(props: IFormInput<V>) => {
	const [value, setValue] = useState<string>(String(props.default));
	const [renderStep, setRenderStep] = useState<number>(0);
	const parse = props.parse || String;

	const Submit = () => {
		useEffect(() => {
			const parsed = parse(value) as V;
			props.onSet(parsed);
		}, []);
		return null;
	};

	if (renderStep === 0) {
		return (
			<ReadlineResolver
				label={props.label}
				sensitive={props.sensitive}
				default={String(props.default)}
				onSubmit={(value) => {
					setValue(value);
					setRenderStep(1);
				}}
			/>
		);
	}
	if (renderStep === 1) {
		return (
			<Persisted>
				<ShowOutput {...props} value={value!} onMount={() => setRenderStep(2)} />
			</Persisted>
		);
	}

	return <Submit />;
};
