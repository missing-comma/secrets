import {makeDependencyLoader} from '../../../data/dependency-loader/index.js';
import {ConfigFS, SecretFS} from '../../../data/file-system/index.js';
import {PasswordCheck} from '../../../services/password/check/index.js';
import {SecretCheckExists} from '../../../services/secret/check-exists/index.js';
import {SecretCreatePair} from '../../../services/secret/create-pair/index.js';
import {SecretSavePair} from '../../../services/secret/save-pair/index.js';

export default makeDependencyLoader(() => {
	const secrets = new SecretFS();
	const config = new ConfigFS();
	const save = new SecretSavePair(secrets);
	return {
		checkHash: new PasswordCheck(config),
		create: new SecretCreatePair(secrets, save),
		checkExists: new SecretCheckExists(secrets),
	};
});
