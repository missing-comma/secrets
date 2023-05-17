import { makeDependencyLoader } from '../../../data/dependency-loader/index.js';
import { ConfigFS } from '../../../data/file-system/index.js';
import { PasswordCheckAlreadyStored } from '../../../services/password/check-already-stored/index.js';
import { PasswordSave } from '../../../services/password/save/index.js';

export default makeDependencyLoader(() => {
	const configFS = new ConfigFS();
	return {
		configFS,
		savePassword: new PasswordSave(configFS),
		hasPasswordSet: new PasswordCheckAlreadyStored(configFS),
	};
});
