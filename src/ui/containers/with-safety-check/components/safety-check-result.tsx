import React, { useEffect } from 'react';
import { Text } from 'ink';
import { TextBox } from '../../../components/text-box/index.js';
import { ISafetyCheckProps } from './safety-check.js';

export interface ISafetyCheckResultProps extends ISafetyCheckProps {
	readonly userGaveConsent: boolean;
}

const RunOnShell: React.FC<{ label: string; command: string }> = (props) => {
	return (
		<>
			<Text color="red">{'> ' + props.label}</Text>
			<TextBox color="red" alignItems="flex-start" alignSelf="flex-start">
				{props.command}
			</TextBox>
		</>
	);
};

const ShellExportEnv: React.FC = () => {
	if (process.platform === 'win32') {
		return (
			<>
				<RunOnShell label="Run on Powershell:" command={`$env:SECRETS_ENV='local'`} />
				<RunOnShell label="Run on CMD:" command={`set "SECRETS_ENV=local"`} />
			</>
		);
	}
	if (process.platform === 'linux' || process.platform === 'darwin') {
		return <RunOnShell label="Run on your terminal:" command={`SECRETS_ENV="local"`} />;
	}
	return (
		<TextBox color="red">
			{`Define environmental variable [SECRETS_ENV] with value ["local"]`}
		</TextBox>
	);
};

export const SafetyCheckResult: React.FC<ISafetyCheckResultProps> = (props) => {
	useEffect(() => {
		if (props.userGaveConsent) {
			props.finish();
		}
	}, []);

	if (props.userGaveConsent) {
		return null;
	}

	return (
		<>
			<Text color="red">{'Stopping execution.'}</Text>
			<Text color="red">{`If you wanted to execute using [local] environment:`}</Text>
			<ShellExportEnv />
		</>
	);
};
