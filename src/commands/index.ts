import SecretCommands from './secrets/index.js';
import PasswordCommands from './password/index.js';
import ConfigCommands from './config/index.js';
import BaseCommands from './base/index.js';

const ALL = {
	...SecretCommands,
	...PasswordCommands,
	...ConfigCommands,
	...BaseCommands,
};

const KEYS = Object.keys(ALL) as ReadonlyArray<keyof typeof ALL>;

export default {
	ALL,
	KEYS,
};
