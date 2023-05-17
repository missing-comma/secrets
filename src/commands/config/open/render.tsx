import React, { useEffect } from 'react';
import { Text } from 'ink';
import Deps from './dependencies.js';
import { TextBox } from '../../../ui/components/text-box/index.js';

export default () => {
	const { config } = Deps;

	useEffect(() => {
		config.open.handle();
	}, []);

	return (
		<TextBox color={'yellow'}>
			<Text>{'Well, it did finish'}</Text>
		</TextBox>
	);
};
