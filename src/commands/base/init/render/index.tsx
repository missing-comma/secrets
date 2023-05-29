import React, { useEffect, useMemo } from 'react';
import { Newline, Text } from 'ink';
import { InitForm, IFormValues, useInitFormStore } from './form/index.js';
import { UpdateConfig } from './update-config/index.js';
import { makeFocusedFlow } from '../../../../ui/components/flow-render/index.js';
import Deps from '../dependencies.js';
import { TextBox } from '../../../../ui/components/text-box/index.js';

const Flow = makeFocusedFlow('init-flow');

const InitializeConfig = () => {
	const { configFS } = Deps;

	const initialValues = useMemo((): IFormValues => {
		return {
			hashingAlgorithm: configFS.get('hashingAlgorithm'),
			password: '',
		};
	}, []);

	const { values } = useInitFormStore();

	const { advance, ended } = Flow.useContext();

	useEffect(() => {
		if (!ended) return;
	}, [ended]);

	return (
		<Flow.Container>
			<InitForm initialValues={initialValues} onFinish={advance} />
			<UpdateConfig values={values} onFinish={advance} />
			<>
				<Newline count={1} />
				<Text color="green">
					{'Initialization finished with success. You are good to go.'}
				</Text>
			</>
		</Flow.Container>
	);
};

export default () => {
	const { configFS } = Deps;
	const alreadyInitialized = configFS.get('passwordHash') !== '';

	if (alreadyInitialized) {
		return (
			<>
				<TextBox color="red">{'Config already initialized'}</TextBox>
				<Text color="red">
					{'The config file is located at:'}
					<Newline />
					<Text color="cyan" underline>
						{configFS.path}
					</Text>
					<Newline />
				</Text>
			</>
		);
	}

	return <InitializeConfig />;
};
