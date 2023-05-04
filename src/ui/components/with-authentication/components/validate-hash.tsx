import React, { useEffect } from 'react';
import { Text, Box } from 'ink';
import { useMutation } from '../../../hooks/use-mutation/index.js';
import Spinner from 'ink-spinner';

export interface IValidateHashProps {
	validateHash(password: string): Promise<boolean>;
	password: string;
	onEvaluate(valid: boolean): void;
}

export const ValidateAuthHash: React.FC<IValidateHashProps> = (props) => {
	const { validateHash, onEvaluate, password } = props;

	const evaluate = async () => validateHash(password);

	const mutation = useMutation(async () => {
		const evaluatePromise = evaluate();
		await Promise.all([evaluatePromise, new Promise((r) => setTimeout(r, 1000))]);
		const result = await evaluatePromise;
		setImmediate(async () => onEvaluate(result));
	});

	useEffect(() => {
		mutation.mutate();
	}, []);

	return (
		<Box>
			<Box paddingRight={1}>
				<Spinner type="line" />
			</Box>
			<Text>Validating password</Text>
			<Box paddingLeft={1}>
				<Spinner type="binary" />
			</Box>
		</Box>
	);
};
