import React from 'react';
import { PasswordResolver } from '../wait-for-password/components/password-resolver.js';
import { useWaitForSecretInputState } from './hooks/use-secret-input-state.js';
import { IWaitForSecretInputProps as Props } from './types.js';

export const WaitForSecretInput: React.FC<Props> = (props) => {
	const { setSecret, state } = useWaitForSecretInputState(props);

	if (state.done) {
		return <PasswordResolver onSet={setSecret} title={`Write/Paste your ${props.label}:`} />;
	}
	return <>{props.children}</>;
};
