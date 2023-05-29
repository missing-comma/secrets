import React from 'react';
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

export const TableSelector: React.FC<IProps<any>> = (props) => {
	const selected = useSelectedCoordinates(props);

	const Option: React.FC<ISelectorOptionProps> = ({ option }) => {
		const isSelected = option.key === props.selected.key;
		const optionWidth = 100 / props.matrix.cols + '%';
		return (
			<Box
				width={optionWidth}
				borderStyle={isSelected ? 'bold' : 'round'}
				paddingX={1}
				justifyContent="center"
			>
				<Text>{option.label.value}</Text>
			</Box>
		);
	};

	useInput(
		(_, key) => {
			if (key.leftArrow) {
				selected.go.left();
			}
			if (key.rightArrow) {
				selected.go.right();
			}
			if (key.upArrow) {
				selected.go.up();
			}
			if (key.downArrow) {
				selected.go.down();
			}
			if (key.return) {
				props.onDone();
			}
		},
		{
			isActive: props.state === 'selecting',
		},
	);

	return (
		<Box flexDirection="column">
			{props.matrix.values.map((row, rowIndex) => {
				const rowKey = `selector-row-${rowIndex}`;
				return (
					<Box key={rowKey}>
						{row.map((option) => {
							const optionKey = `${rowKey}-col-${option.key}`;
							return <Option option={option} key={optionKey} />;
						})}
					</Box>
				);
			})}
		</Box>
	);
};
