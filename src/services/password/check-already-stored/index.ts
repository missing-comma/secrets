import { ConfigFS } from '../../../data/file-system/index.js';

export class PasswordCheckAlreadyStored {
	constructor(private readonly config: ConfigFS) {}

	public handle = (): boolean => {
		return this.config.get('passwordHash') !== '';
	};
}
