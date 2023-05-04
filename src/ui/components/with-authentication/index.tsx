import React, {useState} from 'react';
import {PasswordResolver} from '../wait-for-password/components/password-resolver.js';
import {ValidateAuthHash} from './components/validate-hash.js';
import {Newline} from 'ink';
import {TextBox} from '../text-box/index.js';

export interface IWaitForAuthenticationProps {
	validateHash(password: string): Promise<boolean>;
	children: React.FC<{password: string}>;
}

export const WaitForAuthentication: React.FC<IWaitForAuthenticationProps> = (props) => {
	const {children: Children} = props;
	const [password, setPassword] = useState<string | null>(null);
	const [valid, setValid] = useState<boolean | null>(null);

	if (password === null) {
		return <PasswordResolver onSet={setPassword} title={'Write/Paste your password:'} />;
	}

	if (password !== null && valid === false) {
		return <TextBox color="red">{`Password didn't match`}</TextBox>;
	}

	return (
		<>
			<ValidateAuthHash
				password={password}
				onEvaluate={setValid}
				validateHash={props.validateHash}
			/>
			{valid && <Newline />}
			{valid && <Children password={password} />}
		</>
	);
};

// export const WaitForAuthentication: React.FC<
// 	IWaitForAuthenticationProps
// > = props => {
// 	console.log('bypassing password fetch');
// 	const {children: Children} = props;
// 	return <Children password={'************'} />;
// };
