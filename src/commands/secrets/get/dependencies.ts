import {makeDependencyLoader} from '../../../data/dependency-loader/index.js';
import {ConfigFS, SecretFS} from '../../../data/file-system/index.js';
import {PasswordCheck} from '../../../services/password/check/index.js';
import {SecretCheckExists} from '../../../services/secret/check-exists/index.js';
import {SecretGetValue} from '../../../services/secret/get-pair-value/index.js';

export default makeDependencyLoader(() => {
	const secrets = new SecretFS();
	const config = new ConfigFS();
	return {
		checkHash: new PasswordCheck(config),
		get: new SecretGetValue(secrets),
		checkExists: new SecretCheckExists(secrets),
	};
});
