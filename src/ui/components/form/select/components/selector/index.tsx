import React from 'react';
import { Box, Text } from 'ink';
import { useInput } from 'ink';
import { useSelectedCoordinates } from '../../hooks/use-selection-coordinates.js';
import { IFormSelectorParsedProps as IProps } from '../../types.js';

export const Selector: React.FC<IProps<any>> = (props) => {
	const selected = useSelectedCoordinates(props);

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
							const isSelected = option.key === props.selected.key;
							const optionKey = `${rowKey}-col-${option.key}`;
							const optionWidth = 100 / props.matrix.cols + '%';
							return (
								<Box
									width={optionWidth}
									key={optionKey}
									borderStyle={isSelected ? 'bold' : 'round'}
									paddingX={1}
									justifyContent="center"
								>
									<Text>{option.label}</Text>
								</Box>
							);
						})}
					</Box>
				);
			})}
		</Box>
	);
};
