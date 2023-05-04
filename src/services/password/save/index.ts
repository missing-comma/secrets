import { Hasher } from '../../../data/encrypt/index.js';
import { ConfigFS } from '../../../data/file-system/index.js';

export class PasswordSave {
	constructor(private readonly config: ConfigFS) {}

	public handle = async (password: string): Promise<void> => {
		const hasher = new Hasher(this.config.get('hashingAlgorithm'));
		const passwordHash = await hasher.hash(password);

		this.config.set('passwordHash', passwordHash);
	};
}
