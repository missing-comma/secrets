import React from 'react';
import { Command } from '../../../data/command/index.js';
import factory from './dependencies.js';
import Render from './render/index.js';

const command = new Command({
	description: 'initialize all required variables',
	name: 'init',
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
