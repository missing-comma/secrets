import React, { useEffect } from 'react';
import Deps from './dependencies.js';
import { WaitForSecretInput } from '../../../ui/components/wait-for-secret-input/index.js';
import { TextBox } from '../../../ui/components/text-box/index.js';
import { WaitForAuthentication } from '../../../ui/components/with-authentication/index.js';

type Props = {
	name: string;
	description: string | null;
};

export default function PrivateCreateCommand({ name: key, description }: Props) {
	const { checkExists, checkHash, create } = Deps;

	useEffect(() => {
		const keyAlreadyExists = checkExists.handle(key);
		if (keyAlreadyExists) {
			throw new Error(`secret for key [ ${key} ] already exists`);
		}
	}, []);

	return (
		<WaitForAuthentication validateHash={checkHash.handle}>
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
