import { useCallback } from 'react';
import {
	IWaitForSecretInputProps as Props,
	WaitForSecretInputValidate as Validation,
	IWaitForSecretInputValidateResult as ValidateResult,
} from '../types.js';

const adaptResult = (result: boolean | string): ValidateResult => {
	if (typeof result === 'string')
		return {
			valid: false,
			message: result,
		};
	return {
		valid: result,
		message: '',
	};
};

const injectNameInMessage = (message: string, name: string): string => {
	return message.replaceAll('{name}', name);
};

export const useWaitForSecretInputValidate = (props: Props) => {
	const fallbackValidate: Required<Props>['validateSecret'] = useCallback(
		(secret) => {
			if (props.validateSecret) {
				const result = props.validateSecret(secret);
				if (result === false) return '{name} is not valid';
				return result;
			}
			return true;
		},
		[props.validateSecret, props.label],
	);

	const validate: Validation = useCallback(
		(secret) => {
			if (secret === undefined || secret === null) {
				return { valid: false, message: '' };
			}
			const result = adaptResult(fallbackValidate(secret));
			return {
				...result,
				message: injectNameInMessage(result.message, props.label),
			};
		},
		[fallbackValidate, props.label],
	);

	return validate;
};
