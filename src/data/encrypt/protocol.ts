import { HashAlgorithm } from '../../domain/hash-algorith.js';

export interface IHasher {
	readonly name: HashAlgorithm;

	hash(value: string): Promise<string>;

	compare(value: string, hash: string): Promise<boolean>;
}
