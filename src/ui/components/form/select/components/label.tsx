import React from 'react';
import { IFormSelectorParsedProps as IProps } from '../types.js';
import { Text } from 'ink';

type SelectorLabelProps = Pick<IProps<any>, 'label' | 'selected' | 'inline'>;
export const SelectorLabel: React.FC<SelectorLabelProps> = (props) => {
	return (
		<Text>
			{props.label + ': '}
			{!props.inline && <Text color="gray">{props.selected.label.placeholder}</Text>}
		</Text>
	);
};
