import convict from 'convict';
import { PGetBaseFS } from '../base/index.js';
import { IConfig } from '../../../domain/config.js';
import { SUPPORTED_HASH_ALGORITHMS, HashAlgorithm } from '../../../domain/hash-algorith.js';

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
				hashingAlgorithm: {
					format: SUPPORTED_HASH_ALGORITHMS,
					doc: 'The algorithm used for hashing/comparing the password',
					default: 'argon2' as HashAlgorithm,
				},
			}),
		);
	}
}
