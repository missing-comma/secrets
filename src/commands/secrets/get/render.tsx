import React, { useEffect } from 'react';
import Deps from './dependencies.js';
import { TextBox } from '../../../ui/components/text-box/index.js';
import { WaitForAuthentication } from '../../../ui/components/with-authentication/index.js';
import clipboardy from 'clipboardy';

type Props = {
	name: string;
};

export default function PrivateGetCommand({ name: key }: Props) {
	const { checkHash, get, checkExists } = Deps;

	useEffect(() => {
		const keyAlreadyExists = checkExists.handle(key);
		if (!keyAlreadyExists) {
			throw new Error(`secret for key [ ${key} ] does not exist`);
		}
	}, []);

	return (
		<WaitForAuthentication validateHash={checkHash.handle}>
			{({ password }) => {
				const value = get.handle(key, password);
				useEffect(() => {
					clipboardy.writeSync(value);
				}, []);
				return <TextBox color="green">{'Value copied to clipboard'}</TextBox>;
			}}
		</WaitForAuthentication>
	);
}
