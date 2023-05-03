#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import App from './app.js';
import {Command} from './data/command/index.js';
import COMMANDS from './commands/index.js';
import {CommandArgs} from './data/args/index.js';

const cmd = new Command({
	command: '<command>',
	description: 'Run a command',
	depth: 0,
})
	.positional('command', {
		describe: 'command to run',
		choices: COMMANDS.KEYS,
		demandOption: true,
	})
	.options({
		verbose: {
			describe: 'Show more information',
			type: 'boolean',
			default: false,
		},
	});
const {command, verbose} = cmd.parse();

CommandArgs.load({verbose});
COMMANDS.ALL[command].load();

render(<App command={command} />);
