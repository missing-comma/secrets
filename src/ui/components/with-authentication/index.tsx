import React, { useState } from 'react';
import { PasswordResolver } from '../wait-for-password/components/password-resolver.js';
import { ValidateAuthHash } from './components/validate-hash.js';
import { TextBox } from '../text-box/index.js';
import { Config } from '../../../data/config/index.js';
import { Text } from 'ink';

export interface IWaitForAuthenticationProps {
	validateHash(password: string): Promise<boolean>;
	bypass?: boolean;
	children: React.FC<{ password: string | null }>;
}

export const WaitForAuthentication: React.FC<IWaitForAuthenticationProps> = (props) => {
	const { children: Children, bypass } = props;
	const [password, setPassword] = useState<string | null>(() => Config.forcePassword.get());
	const [valid, setValid] = useState<boolean | null>(null);

	if (bypass) {
		return (
			<>
				<Text color="yellow">{'⚠️  No password used'}</Text>
				<Children password={null} />
			</>
		);
	}

	if (password === null) {
		return <PasswordResolver onSet={setPassword} title={'Write/Paste your password:'} />;
	}

	if (valid === null) {
		return (
			<ValidateAuthHash
				password={password}
				onEvaluate={setValid}
				validateHash={props.validateHash}
			/>
		);
	}
	if (valid === false) {
		return <TextBox color="red">{`Password didn't match`}</TextBox>;
	}

	return (
		<>
			<Text color="green">{'✔ Password matched'}</Text>
			<Children password={password} />
		</>
	);
};
