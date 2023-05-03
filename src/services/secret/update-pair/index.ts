import {SecretFS} from '../../../data/file-system/index.js';
import {SecretSavePair} from '../save-pair/index.js';

export class SecretUpdatePair {
	constructor(
		private readonly secrets: SecretFS,
		private readonly save: SecretSavePair,
	) {}

	public handle = (key: string, password: string, value: string) => {
		if (!this.secrets.has(key)) {
			throw new Error(`Can not locate secret [ ${key} ] for update`);
		}
		const secret = this.secrets.get(key);
		return this.save.handle(key, password, {
			...secret,
			value,
		});
	};
}
