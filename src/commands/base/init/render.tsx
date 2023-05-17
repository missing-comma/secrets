import React from 'react';
import { Text } from 'ink';
import Deps from './dependencies.js';
import { TextBox } from '../../../ui/components/text-box/index.js';
import { makeFocusedFlow } from '../../../ui/components/flow-render/index.js';
import { FormInput } from '../../../ui/components/form-input/index.js';
import { SUPPORTED_HASH_ALGORITHMS } from '../../../domain/hash-algorith.js';

const Flow = makeFocusedFlow('init.form');

export default () => {
	const {} = Deps;

	const { advance } = Flow.useContext();

	return (
		<Flow.Container>
			<FormInput
				label={'Encryption algorithm'}
				placeholder={SUPPORTED_HASH_ALGORITHMS.join(' | ')}
				onSet={() => {
					advance();
				}}
			/>
			<FormInput
				label={'Batata'}
				placeholder={'Some batata values'}
				onSet={() => {
					advance();
				}}
			/>
			<TextBox color={'yellow'}>
				<Text>{'Well, it did finish'}</Text>
			</TextBox>
		</Flow.Container>
	);
};
