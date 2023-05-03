import React, {useState} from 'react';
import {PasswordResolver} from '../wait-for-password/components/password-resolver.js';

export interface IWithSecretProps {
	RenderBefore?: React.FC<{advance: () => void}>;
	children: React.FC<{secret: string}>;
}

type WithSecretRenderState = 'before-write' | 'write-secret' | 'after-write';

export const WithSecret: React.FC<IWithSecretProps> = props => {
	const {RenderBefore = () => null, children: Children} = props;
	const [secret, setSecret] = useState<string>('');
	const [renderState, setRenderState] = useState<WithSecretRenderState>(() => {
		if (props.RenderBefore) {
			return 'before-write';
		}
		return 'write-secret';
	});
	if (renderState === 'before-write') {
		return (
			<RenderBefore
				advance={() => {
					setRenderState('write-secret');
				}}
			/>
		);
	}
	if (renderState === 'write-secret') {
		return (
			<PasswordResolver
				onSet={next => {
					setSecret(next);
					setRenderState('after-write');
				}}
				title={'Write/Paste your secret:'}
			/>
		);
	}
	return <Children secret={secret} />;
};
