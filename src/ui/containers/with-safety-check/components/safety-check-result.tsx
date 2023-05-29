import React, { useEffect } from 'react';
import { Newline, Text } from 'ink';
import { TextBox } from '../../../components/text-box/index.js';
import { ISafetyCheckProps } from './safety-check.js';

export interface ISafetyCheckResultProps extends ISafetyCheckProps {
	readonly userGaveConsent: boolean;
}

const ShellExportEnv: React.FC = () => {
	if (process.platform === 'win32') {
		return (
			<TextBox color="red">
				{`on Powershell: $env:SECRETS_ENV='local'`}
				<Newline />
				{`on CMD: set "SECRETS_ENV=local"`}
			</TextBox>
		);
	}
	if (process.platform === 'linux' || process.platform === 'darwin') {
		return <TextBox color="red">{`SECRETS_ENV="local"`}</TextBox>;
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
			<Newline />
			<Text color="red">{`If you wanted to run on [local] environment, run:`}</Text>
			<ShellExportEnv />
		</>
	);
};
