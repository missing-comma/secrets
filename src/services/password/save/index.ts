import {ConfigFS} from '../../../data/file-system/index.js';
import hash from './hash.js';

export class PasswordSave {
	constructor(private readonly config: ConfigFS) {}

	public handle = async (password: string): Promise<void> => {
		const passwordHash = await hash(password);
		this.config.set('passwordHash', passwordHash);
	};
}
