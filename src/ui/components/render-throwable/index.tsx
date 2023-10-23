import React from 'react';
import { ErrorBox } from '../error-box/index.js';
import { Text } from 'ink';

type Props = {
	error: Error;
	description?: string;
};

export const RenderThrowable: React.FC<Props> = ({ error, description }) => {
	// useEffect(() => {
	// 	throw error;
	// }, []);

	return (
		<>
			<ErrorBox>{error.message}</ErrorBox>
			{description && <Text color={'red'}>{description}</Text>}
		</>
	);
};
