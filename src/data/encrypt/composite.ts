import { HashAlgorithm } from '../../domain/hash-algorith.js';
import { IHasher } from './protocol.js';

export class HasherComposite implements IHasher {
	private readonly hasher: IHasher;
	public readonly name: HashAlgorithm;

	constructor(algorithm: HashAlgorithm, hashers: Record<HashAlgorithm, IHasher>) {
		this.name = algorithm;
		this.hasher = hashers[algorithm];
		if (!this.hasher) {
			throw new Error(`Unknown hashing algorithm`);
		}
	}

	hash(value: string): Promise<string> {
		return this.hasher.hash(value);
	}

	compare(value: string, hash: string): Promise<boolean> {
		return this.hasher.compare(value, hash);
	}
}
