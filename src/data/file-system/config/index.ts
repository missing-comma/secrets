import convict from 'convict';
import {PGetBaseFS} from '../base/index.js';
import {IConfig} from '../../../domain/config.js';

export class ConfigFS extends PGetBaseFS<IConfig> {
	constructor() {
		super(
			'config',
			convict({
				passwordHash: {
					default: '',
					doc: 'Hash of your password',
					format: String,
					sensitive: true,
				},
			}),
		);
	}
}
