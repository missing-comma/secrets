import React, { useEffect, useMemo } from 'react';
import Deps from './dependencies.js';
import { TextBox } from '../../../ui/components/text-box/index.js';
import { WaitForAuthentication } from '../../../ui/components/with-authentication/index.js';
import clipboardy from 'clipboardy';
import { WaitForAnyInput } from '../../../ui/components/wait-for-any-input/index.js';
import { Text } from 'ink';

type Props = {
	name: string;
};

export default function PrivateGetCommand({ name: key }: Props) {
	const { checkHash, get, checkExists, config } = Deps;

	useEffect(() => {
		const missingKey = !checkExists.handle(key);
		if (missingKey) {
			throw new Error(`secret for key [ ${key} ] does not exist`);
		}
	}, []);

	const secret = useMemo(() => get.handle(key), [key]);
	const requiresPassword = useMemo(() => secret.requiresPassword(), [secret]);

	return (
		<WaitForAuthentication validateHash={checkHash.handle} bypass={!requiresPassword}>
			{({ password }) => {
				const value = secret.decrypt(password);
				useEffect(() => {
					if (config.output === 'clipboard') {
						clipboardy.writeSync(value);
					}
				}, []);

				if (config.output === 'clipboard') {
					return (
						<>
							<TextBox color="green">{'Value copied to clipboard'}</TextBox>
							<WaitForAnyInput timeout={config.pauseTimeoutAfterCommand} />
						</>
					);
				}

				if (config.output === 'terminal') {
					return (
						<>
							<TextBox flexDirection="column" center>
								<Text>{'Secret value:'}</Text>
								<Text color="green">{value}</Text>
							</TextBox>
							<WaitForAnyInput timeout={config.pauseTimeoutAfterCommand} />
						</>
					);
				}

				throw new Error(`Invalid output [ ${config.output} ]`);
			}}
		</WaitForAuthentication>
	);
}
