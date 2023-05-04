import React, { useState } from 'react';
import { PasswordResolver } from '../wait-for-password/components/password-resolver.js';
import { ValidateAuthHash } from './components/validate-hash.js';
import { TextBox } from '../text-box/index.js';
import { Config } from '../../../data/config/index.js';

export interface IWaitForAuthenticationProps {
	validateHash(password: string): Promise<boolean>;
	children: React.FC<{ password: string }>;
}

export const WaitForAuthenticationReal: React.FC<IWaitForAuthenticationProps> = (props) => {
	const { children: Children } = props;
	const [password, setPassword] = useState<string | null>(() => Config.forcePassword.get());
	const [valid, setValid] = useState<boolean | null>(() =>
		Config.forcePassword.get() === null ? null : true,
	);

	if (password === null) {
		return <PasswordResolver onSet={setPassword} title={'Write/Paste your password:'} />;
	}

	if (valid === false) {
		return <TextBox color="red">{`Password didn't match`}</TextBox>;
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

	return <Children password={password} />;
};

export const WaitForAuthenticationBypassing: React.FC<IWaitForAuthenticationProps> = (props) => {
	const { children: Children } = props;
	return <Children password={Config.forcePassword.get()!} />;
};

// export const WaitForAuthentication: React.FC<IWaitForAuthenticationProps> =
// 	Config.forcePassword.get() !== null
// 		? WaitForAuthenticationBypassing
// 		: WaitForAuthenticationReal;

export const WaitForAuthentication: React.FC<IWaitForAuthenticationProps> =
	WaitForAuthenticationReal;
