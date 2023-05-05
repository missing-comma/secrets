import { Hasher } from '../../../data/encrypt/index.js';
import { ConfigFS } from '../../../data/file-system/index.js';

export class PasswordCheck {
	constructor(private readonly config: ConfigFS) {}

	public handle = async (input: string): Promise<boolean> => {
		const hasher = new Hasher(this.config.get('hashingAlgorithm'));
		const passwordHash = this.config.get('passwordHash');
		if (passwordHash === '') return false;
		return await hasher.compare(input, passwordHash).catch((err) => {
			console.error('Failed to check password hash');
			console.error(err);
			return false;
		});
	};
}
