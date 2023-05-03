import RenderGet from './secrets/get/index.js';
import RenderCreate from './secrets/create/index.js';

import PasswordSet from './password/set/index.js';

const ALL = {
	get: RenderGet,
	create: RenderCreate,
	'password-set': PasswordSet,
};

const KEYS = Object.keys(ALL) as ReadonlyArray<keyof typeof ALL>;

export default {
	ALL,
	KEYS,
};
