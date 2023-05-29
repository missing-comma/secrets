import React from 'react';
import { IFormSelectorParsedProps as IProps } from '../types.js';
import { Text } from 'ink';

type SelectorLabelProps = Pick<IProps<any>, 'label' | 'selected'>;
export const SelectorLabel: React.FC<SelectorLabelProps> = (props) => {
	return (
		<Text>
			{props.label + ': '}
			<Text color="gray">{props.selected.label}</Text>
		</Text>
	);
};
