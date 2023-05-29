import React, { useState } from 'react';
import { Command } from '../../../../data/command/index.js';
import { makeFocusedFlow } from '../../../components/flow-render/index.js';
import { SafetyCheckResult } from './safety-check-result.js';
import { SafetyBooleanSelector } from './selector.js';
import chalk from 'chalk';

const Flow = makeFocusedFlow('safety-check');

export interface ISafetyCheckProps {
	readonly command: Command;
	finish(): void;
}

export const SafetyCheck: React.FC<ISafetyCheckProps> = (props) => {
	const [userGaveConsent, setUserConsent] = useState<boolean>(false);
	const { advance } = Flow.useContext();

	return (
		<Flow.Container>
			<SafetyBooleanSelector
				label={`You're running on ${chalk.red('PRODUCTION')}. Is that correct?`}
				onChange={(next) => {
					setUserConsent(next);
					advance();
				}}
				selected={userGaveConsent}
			/>
			<SafetyCheckResult
				command={props.command}
				userGaveConsent={userGaveConsent}
				finish={props.finish}
			/>
		</Flow.Container>
	);
};
