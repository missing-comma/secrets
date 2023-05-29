import React, { useEffect, useState } from 'react';
import { Newline, Text } from 'ink';
import Deps from './dependencies.js';
import { FlowRender } from '../../../ui/components/flow-render/index.js';
import { SUPPORTED_HASH_ALGORITHMS } from '../../../domain/hash-algorith.js';
import { FormSelect } from '../../../ui/components/form/select/index.js';
import { IConfig } from '../../../domain/config.js';
import { TextInput } from '../../../ui/components/form/text-input/index.js';
import Spinner from 'ink-spinner';
import { useMutation } from '../../../ui/hooks/use-mutation/index.js';

const Flow = FlowRender.focus('init-form');

const CreateConfig: React.FC<IConfig> = (props) => {
	const { configFS, savePassword } = Deps;
	const { advance } = Flow.useContext();
	const [done, setDone] = useState<boolean>(false);

	useEffect(() => {
		if (done) advance();
	}, [done]);

	const saving = useMutation(async () => {
		configFS.set('hashingAlgorithm', props.hashingAlgorithm);
		await savePassword.handle(props.passwordHash);
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

export default () => {
	const [state, setState] = useState<IConfig>({
		hashingAlgorithm: 'argon2',
		passwordHash: '',
	});

	const { advance, ended } = Flow.useContext();

	useEffect(() => {
		if (!ended) return;
	}, [ended]);

	return (
		<Flow.Container>
			<FormSelect
				selected={state.hashingAlgorithm}
				label={'Select the encryption algorithm'}
				options={SUPPORTED_HASH_ALGORITHMS}
				onChange={(hashingAlgorithm) => {
					setState((s) => ({ ...s, hashingAlgorithm }));
					advance();
				}}
			/>
			<TextInput
				label={'Write the password for your keys'}
				doneLabel=""
				default={''}
				onSet={(password) => {
					setState((s) => ({ ...s, passwordHash: password }));
					advance();
				}}
				sensitive
			/>
			<CreateConfig {...state} />
			<>
				<Newline count={1} />
				<Text color="green">
					{'Initialization finished with success. You are good to go.'}
				</Text>
			</>
		</Flow.Container>
	);
};
