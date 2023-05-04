import React, { useEffect } from 'react';
import { Text, Static, Box } from 'ink';
import { useMutation } from '../../../hooks/use-mutation/index.js';
import Spinner from 'ink-spinner';
import { useMountRef } from '../../../hooks/use-mount-ref/index.js';

export interface IValidateHashProps {
	validateHash(password: string): Promise<boolean>;
	password: string;
	onEvaluate(valid: boolean): void;
}

export const ValidateAuthHash: React.FC<IValidateHashProps> = (props) => {
	const { validateHash, onEvaluate, password } = props;
	const mountRef = useMountRef();

	const evaluate = async () => validateHash(password);

	const mutation = useMutation(async () => {
		const evaluatePromise = evaluate();
		await Promise.all([evaluatePromise, new Promise((r) => setTimeout(r, 1000))]);
		setImmediate(async () => onEvaluate(await evaluatePromise));
	});

	useEffect(() => {
		mutation.mutate();
	}, []);

	if (mutation.isLoading || !mountRef.current) {
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
	}

	return (
		<Static items={['password-match-out']}>
			{(item) => (
				<Box key={item}>
					<Text color={'green'}>Password match</Text>
				</Box>
			)}
		</Static>
	);
};
