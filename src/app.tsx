import React from 'react';
import COMMANDS, { CommandKey } from './commands/index.js';
import { withErrorHandler } from './ui/components/error-handler/index.js';
import { withSafetyCheck } from './ui/containers/with-safety-check/index.js';

type Props = {
	command: CommandKey;
};

const App: React.FC<Props> = ({ command }) => {
	const { Render } = COMMANDS.get(command);
	if (Render) return <Render />;
	return null;
};

export default withErrorHandler(withSafetyCheck(App));
