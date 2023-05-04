import React from 'react';
import { Command } from '../../../data/command/index.js';
import factory from './dependencies.js';
import PrivateGetCommand from './render.js';

const command = new Command({
	command: '<key>',
	description: "get secret's value",
	name: 'get',
	depth: 1,
}).positional('key', {
	type: 'string',
	demandOption: true,
	description: 'Key of the secret',
});

export default {
	load: () => factory.load(),
	Render: () => {
		const cli = command.parse();
		const { key, ...props } = cli;
		return <PrivateGetCommand {...props} name={cli.key} />;
	},
};
