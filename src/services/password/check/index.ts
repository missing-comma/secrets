import {ConfigFS} from '../../../data/file-system/index.js';
import checkHash from './check-hash.js';

export class PasswordCheck {
	constructor(private readonly config: ConfigFS) {}

	public handle = async (input: string): Promise<boolean> => {
		const passwordHash = this.config.get('passwordHash');
		return await checkHash({input, passwordHash});
	};
}
