import React from 'react';

export type IWaitForSecretInputValidateResult = {
	readonly valid: boolean;
	readonly message: string;
};

export type WaitForSecretInputValidate = {
	(secret: string | undefined | null): IWaitForSecretInputValidateResult;
};

export interface IWaitForSecretInputProps {
	readonly secret?: string | null;
	readonly label: string;
	readonly children: React.ReactNode;
	validateSecret?(secret: string): boolean | string;
	onSecretSet(secret: string): void;
}

export interface IWaitForSecretInputState {
	readonly secret: string;
	readonly done: boolean;
	readonly errors: string[];
}
