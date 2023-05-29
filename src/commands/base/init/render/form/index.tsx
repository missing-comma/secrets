import React, { useEffect } from 'react';

import AlgorithmField from './step/select-encryption-algorith/index.js';
import PasswordField from './step/password/index.js';

import { FlowRender as Flow } from './shared/index.js';
import { IFormValues } from './shared/domain.js';

export interface IInitFormProps {
	onFinish(): void;
	readonly initialValues: Partial<IFormValues>;
}

const Last: React.FC<IInitFormProps> = (props) => {
	useEffect(() => {
		props.onFinish();
	}, []);

	return null;
};

export const InitForm: React.FC<IInitFormProps> = (props) => {
	return (
		<Flow.Container>
			<AlgorithmField value={props.initialValues.hashingAlgorithm} />
			<PasswordField value={props.initialValues.password} />
			<Last {...props} />
		</Flow.Container>
	);
};

export type { IFormValues };
export { useInitFormStore } from './shared/index.js';
