import { Text, useStdin, useStdout } from 'ink';
import React, { useEffect, useState } from 'react';
import { ReadlineSecret } from './readline-secret/index.js';
import { IReadlineProps } from './types.js';

const ReadlineContainer: React.FC<IReadlineProps> = (props) => {
	const { stdin } = useStdin();
	const { stdout } = useStdout();
	const [renderCount, setRenderCount] = useState<number>(0);

	useEffect(() => {
		if (renderCount === 1) {
			new ReadlineSecret({
				...props,
				stdin,
				stdout,
				query: `${props.label}: `,
				onSubmit: (password) => {
					props.onSubmit(password);
				},
			});
		}
	}, [renderCount]);

	useEffect(() => {
		setRenderCount(1);
	}, []);
	return null;
};

export const ReadlineResolver: React.FC<IReadlineProps> = (props) => {
	return (
		<Text>
			<ReadlineContainer {...props} />
		</Text>
	);
};
