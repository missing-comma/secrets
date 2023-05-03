import React, {useEffect} from 'react';
import {Text} from 'ink';
import Deps from './dependencies.js';
import {useMutation} from '../../../ui/hooks/use-mutation/index.js';
import {Loader} from '../../../ui/components/loader.js';
import {withWaitForPassword} from '../../../ui/components/wait-for-password/index.js';
import {TextBox} from '../../../ui/components/text-box/index.js';
import chalk from 'chalk';

const Content = withWaitForPassword(({password}) => {
	const {savePassword} = Deps;
	const mutation = useMutation(async () => {
		await Promise.all([
			savePassword.handle(password),
			new Promise(r => setTimeout(r, 1000)),
		]);
	});

	useEffect(() => {
		mutation.mutate();
	}, []);

	if (mutation.isLoading) {
		return (
			<TextBox color={'yellow'}>
				<Loader />
			</TextBox>
		);
	}

	return (
		<TextBox color={'green'}>
			<Text>Password set successfully</Text>
		</TextBox>
	);
});

export default () => {
	const {hasPasswordSet, configFS} = Deps;
	if (hasPasswordSet.handle()) {
		const configPath = chalk.cyan(configFS.path);
		throw new Error(
			`Password already set. To change it, clear the 'passwordHash' entry inside the config-file at ${configPath}`,
		);
	}
	return <Content />;
};
