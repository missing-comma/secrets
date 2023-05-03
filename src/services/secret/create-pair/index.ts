import {SecretFS} from '../../../data/file-system/index.js';
import {SecretSavePair} from '../save-pair/index.js';

type Payload = {
	value: string;
	description: string | null;
};

export class SecretCreatePair {
	constructor(
		private readonly secrets: SecretFS,
		private readonly save: SecretSavePair,
	) {}

	public handle = (key: string, password: string, payload: Payload) => {
		if (this.secrets.has(key)) {
			throw new Error(`Secret [ ${key} ] already exists`);
		}
		return this.save.handle(key, password, payload);
	};
}
