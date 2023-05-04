import { IHasher } from './protocol.js';
import { HashAlgorithm } from '../../domain/hash-algorith.js';
import { HasherComposite } from './composite.js';
import { Argon2Adapter } from './use-cases/argon2/index.js';
import { BcryptAdapter } from './use-cases/bcrypt/index.js';

export class Hasher extends HasherComposite implements IHasher {
	constructor(algorithm: HashAlgorithm) {
		super(algorithm, {
			argon2: new Argon2Adapter(),
			bcrypt: new BcryptAdapter(12),
		});
	}
}
