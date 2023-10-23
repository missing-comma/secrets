import React, { useEffect } from 'react';
import Deps from './dependencies.js';
import { WaitForSecretInput } from '../../../ui/components/wait-for-secret-input/index.js';
import { TextBox } from '../../../ui/components/text-box/index.js';
import { WaitForAuthentication } from '../../../ui/components/with-authentication/index.js';
import { DetailedError } from '../../../domain/errors.js';

type Props = {
	name: string;
	description: string | null;
	noPassword: boolean;
};

export default function PrivateCreateCommand({ name: key, description, noPassword }: Props) {
	const { checkExists, checkHash, create, getKeys } = Deps;

	useEffect(() => {
		const keyAlreadyExists = checkExists.handle(key);
		if (keyAlreadyExists) {
			const details = `Known keys are:\n${getKeys.handle().map((k) => ' - ' + k + '\n')}`;
			throw new DetailedError(`secret for key [ ${key} ] already exists`, details);
		}
	}, []);

	return (
		<WaitForAuthentication validateHash={checkHash.handle} bypass={noPassword}>
			{({ password }) => {
				return (
					<WaitForSecretInput
						label={'secret'}
						onSecretSet={(secret) => {
							create.handle(key, password, { description, value: secret });
						}}
						secret={key}
					>
						<TextBox color="green">{'Secret saved successfully'}</TextBox>
					</WaitForSecretInput>
				);
			}}
		</WaitForAuthentication>
	);
}
