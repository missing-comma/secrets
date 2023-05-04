import React from 'react';
import COMMANDS from './commands/index.js';
import { withErrorHandler } from './ui/components/error-handler/index.js';

type Props = {
	command: keyof typeof COMMANDS.ALL;
};

export default withErrorHandler(function App({ command }: Props) {
	const { Render } = COMMANDS.ALL[command];
	if (Render) return <Render />;

	return null;
});
