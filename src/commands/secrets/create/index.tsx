import React from 'react';
import { Command } from '../../../data/command/index.js';
import factory from './dependencies.js';
import PrivateGetCommand from './render.js';

const command = new Command({
	command: '<key>',
	description: 'create a secret value',
	name: 'create',
	depth: 1,
})
	.options({
		description: {
			type: 'string',
			demandOption: false,
			default: null,
			description: 'Description of the secret',
		},
	})
	.positional('key', {
		type: 'string',
		demandOption: true,
		description: 'Key of the secret',
	});

export default {
	command,
	load: () => factory.load(),
	Render: () => {
		const cli = command.parse();
		const { key, ...props } = cli;
		return <PrivateGetCommand {...props} name={key} />;
	},
};
