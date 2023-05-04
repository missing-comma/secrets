import React, {useEffect} from 'react';
import {Text} from 'ink';
import {useMutation} from '../../../hooks/use-mutation/index.js';
import {TextBox} from '../../text-box/index.js';
import {Loader} from '../../loader.js';

export interface IValidateHashProps {
	validateHash(password: string): Promise<boolean>;
	password: string;
	onEvaluate(valid: boolean): void;
}

export const ValidateAuthHash: React.FC<IValidateHashProps> = (props) => {
	const {validateHash, onEvaluate, password} = props;

	const evaluate = async () => validateHash(password);

	const mutation = useMutation(async () => {
		const evaluatePromise = evaluate();
		await Promise.all([evaluatePromise, new Promise((r) => setTimeout(r, 1000))]);
		onEvaluate(await evaluatePromise);
	});

	useEffect(() => {
		mutation.mutate();
	}, []);

	if (mutation.isLoading) {
		return (
			<TextBox color={'yellow'}>
				<Loader />
			</TextBox>
		);
	}

	return (
		<TextBox color={'green'}>
			<Text>Password match</Text>
		</TextBox>
	);
};
