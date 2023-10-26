import convict from 'convict';
import { PGetBaseFS } from '../base/index.js';
import { IConfig, SUPPORTED_READ_SECRET_OUTPUT } from '../../../domain/config.js';
import { SUPPORTED_HASH_ALGORITHMS, HashAlgorithm } from '../../../domain/hash-algorith.js';

const builder = <T>(schema: convict.Schema<T>) => schema;
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
				readSecret: builder<IConfig.ReadSecret>({
					output: {
						doc: 'How to show output of the [get] command',
						format: SUPPORTED_READ_SECRET_OUTPUT,
						default: 'clipboard',
					},
					pauseTimeoutAfterCommand: {
						doc: 'How long to pause the process after the secret was read (seconds)',
						format: Number,
						default: 3,
					},
				}),
			}),
		);
	}
}
