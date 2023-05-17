import { useState, useCallback } from 'react';
import {
	IWaitForSecretInputProps as Props,
	IWaitForSecretInputState as State,
	WaitForSecretInputValidate as Validate,
} from '../types.js';
import { useWaitForSecretInputValidate } from './use-secret-input-validation.js';

const getInitialState = (props: Props, validate: Validate): State => {
	const { valid: done, message } = validate(props.secret);

	return {
		secret: props.secret ?? '',
		done,
		errors: [message].filter(Boolean),
	};
};

export const useWaitForSecretInputState = (props: Props) => {
	const validate = useWaitForSecretInputValidate(props);
	const [state, setState] = useState<State>(() => getInitialState(props, validate));

	const setSecret = useCallback((secret: string) => {
		props.onSecretSet?.(secret);
		setState((prev) => {
			const { valid: done, message } = validate(props.secret);
			const errors = [message].filter(Boolean);
			return { ...prev, secret, done, errors: prev.errors.concat(errors) };
		});
	}, []);

	return {
		state,
		setSecret,
	};
};
