import { Hasher } from '../../../data/encrypt/index.js';
import { ConfigFS } from '../../../data/file-system/index.js';

export class PasswordCheck {
	constructor(private readonly config: ConfigFS) {}

	public handle = async (input: string): Promise<boolean> => {
		const hasher = new Hasher(this.config.get('hashingAlgorithm'));
		const passwordHash = this.config.get('passwordHash');
		return await hasher.compare(input, passwordHash);
	};
}
