import React from 'react';
import { SafetyCheck } from './components/safety-check.js';
import { makeFocusedFlow } from '../../components/flow-render/index.js';
import COMMANDS, { CommandKey } from '../../../commands/index.js';

const Flow = makeFocusedFlow('safety-check-container');

export interface ISafetyCheckChildProps {
	command: CommandKey;
}

export const withSafetyCheck = <P extends ISafetyCheckChildProps>(Component: React.FC<P>) => {
	const Container: React.FC<P> = (props) => {
		const { command } = COMMANDS.get(props.command);

		const { advance } = Flow.useContext();

		if (command.isSafeToRun) {
			return <Component {...props} />;
		}

		return (
			<Flow.Container>
				<SafetyCheck command={command} finish={advance} />
				<Component {...props} />
			</Flow.Container>
		);
	};

	return Container;
};
