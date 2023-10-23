import { SecretFS } from '../../../data/file-system/index.js';

export class SecretGetKeys {
	constructor(private readonly secrets: SecretFS) {}

	public handle = (): string[] => {
		return this.secrets.keys();
	};
}
