import React, { useMemo } from 'react';
import chalk from 'chalk';
import { Box, Text } from 'ink';
import { useInput } from 'ink';
import { useSelectedCoordinates } from '../../hooks/use-selection-coordinates.js';
import {
	IFormSelectorParsedProps as IProps,
	IFormSelectorOptions as IOption,
} from '../../types.js';

export type ISelectorOptionProps = {
	readonly option: IOption<any>;
};

export const InlineSelector: React.FC<IProps<any>> = (props) => {
	const selected = useSelectedCoordinates(props);

	const Option: React.FC<ISelectorOptionProps> = ({ option }) => {
		const isSelected = option.key === props.selected.key;
		const label = useMemo(() => {
			if (isSelected) return chalk.bold(option.label.value);
			return option.label.value;
		}, [isSelected, option.label.value]);
		return <Text>{label}</Text>;
	};

	useInput(
		(_, key) => {
			if (key.leftArrow) {
				selected.go.left();
			}
			if (key.rightArrow) {
				selected.go.right();
			}
			if (key.return) {
				props.onDone();
			}
		},
		{
			isActive: props.state === 'selecting',
		},
	);

	const options = props.matrix.values[0] || [];

	return (
		<Box flexDirection="row">
			{options.map((option, rowIndex) => {
				const rowKey = `selector-row-inline-${rowIndex}`;
				const optionKey = `${rowKey}-col-${option.key}`;
				const isLast = rowIndex === options.length - 1;
				return (
					<React.Fragment key={rowKey}>
						<Option key={optionKey + '-option'} option={option} />
						{!isLast && <Text key={optionKey + '-divisor'}>{' | '}</Text>}
					</React.Fragment>
				);
			})}
		</Box>
	);
};
