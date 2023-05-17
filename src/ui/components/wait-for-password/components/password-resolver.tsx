import { Text, useStdin, useStdout } from 'ink';
import React, { useEffect, useState } from 'react';
import { ReadlineSecret } from './readline-secret/index.js';

type Props = {
	onSet(password: string): void;
	title: string | JSX.Element;
};

const PasswordContainer: React.FC<Props> = (props) => {
	const { stdin } = useStdin();
	const { stdout } = useStdout();
	const [renderCount, setRenderCount] = useState<number>(0);

	useEffect(() => {
		if (renderCount === 1) {
			new ReadlineSecret({
				stdin,
				stdout,
				query: '',
				onSubmit: (password) => {
					props.onSet(password);
				},
			});
		}
	}, [renderCount]);

	useEffect(() => {
		setRenderCount(1);
	}, []);
	return null;
};

export const PasswordResolver: React.FC<Props> = (props) => {
	return (
		<Text>
			{props.title}
			<PasswordContainer {...props} />
		</Text>
	);
};
