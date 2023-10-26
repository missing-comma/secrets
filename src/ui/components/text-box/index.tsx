import React from 'react';
import { Text, Box, BoxProps } from 'ink';

export interface ITextBoxProps extends BoxProps {
	children: React.ReactNode;
	color?: string;
	center?: boolean;
}

export const TextBox: React.FC<ITextBoxProps> = (props) => {
	const { color = 'white', children, center = true, ...boxProps } = props;
	return (
		<Box
			alignItems={center ? 'center' : undefined}
			alignSelf={center ? 'center' : undefined}
			padding={1}
			paddingX={10}
			borderColor={color}
			borderStyle="round"
			{...boxProps}
		>
			{['number', 'boolean', 'string'].includes(typeof children) ? (
				<Text color={color}>{children}</Text>
			) : (
				children
			)}
		</Box>
	);
};
