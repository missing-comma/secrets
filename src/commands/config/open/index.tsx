import React from 'react';
import { Command } from '../../../data/command/index.js';
import factory from './dependencies.js';
import Render from './render.js';

const command = new Command({
	description: 'open the config file',
	name: 'config-open',
	depth: 1,
});
export default {
	command,
	load: () => factory.load(),
	Render: () => {
		command.parse();
		return <Render />;
	},
};
