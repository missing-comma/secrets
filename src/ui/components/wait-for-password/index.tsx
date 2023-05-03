import React from 'react';
import {useState} from 'react';

import {PasswordResolver} from './components/password-resolver.js';
import {Text} from 'ink';

type InjectedProps = {
	readonly password: string;
};

export const withWaitForPassword = <P extends InjectedProps>(
	Component: React.FC<P>,
) => {
	const C = Component as React.FC<Omit<P, 'password'>>;
	const Container: React.FC<Omit<P, 'password'>> = props => {
		const [password, setPassword] = useState<string | null>(null);

		if (password === null) {
			return (
				<PasswordResolver
					onSet={setPassword}
					title={'Write/Paste your password below:'}
				/>
			);
		}
		return (
			<>
				<Text color="green">{'Password read successfully'}</Text>
				<C password={password} {...props} />
			</>
		);
	};

	return Container;
};
