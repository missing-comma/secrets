import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import Deps from '../../dependencies.js';

import Spinner from 'ink-spinner';
import { IFormValues } from '../form/index.js';
import { useMutation } from '../../../../../ui/hooks/use-mutation/index.js';

export interface IUpdateConfigProps {
	readonly values: IFormValues;
	onFinish(): void;
}

export const UpdateConfig: React.FC<IUpdateConfigProps> = ({ onFinish, values }) => {
	const { configs, savePassword } = Deps;
	const [done, setDone] = useState<boolean>(false);

	useEffect(() => {
		if (done) onFinish();
	}, [done]);

	const saving = useMutation(async () => {
		configs.set('hashingAlgorithm', values.hashingAlgorithm);
		await savePassword.handle(values.password);
		setDone(true);
	});

	useEffect(() => {
		saving.mutate();
	}, []);

	return (
		<>
			<Text>{'Saving config '}</Text>
			<Spinner type="bouncingBall" />
		</>
	);
};
