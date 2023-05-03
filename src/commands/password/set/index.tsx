import React from 'react';
import {Command} from '../../../data/command/index.js';
import factory from './dependencies.js';
import Render from './render.js';

const command = new Command({
	description: 'set your password',
	name: 'password-set',
	depth: 1,
});
export default {
	load: () => factory.load(),
	Render: () => {
		command.parse();
		return <Render />;
	},
};
