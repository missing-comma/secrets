import { ConfigFS } from '../../../data/file-system/index.js';

export class ConfigOpen {
	constructor(private readonly config: ConfigFS) {}

	public handle = async (): Promise<void> => {
		console.log(this.config.path);
	};
}
