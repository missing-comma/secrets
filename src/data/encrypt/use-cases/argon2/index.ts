import argon2 from 'argon2';
import { IHasher } from '../../protocol.js';

export class Argon2Adapter implements IHasher {
	public readonly name = 'argon2';

	hash(value: string): Promise<string> {
		return argon2.hash(value);
	}

	compare(value: string, hash: string): Promise<boolean> {
		return argon2.verify(hash, value);
	}
}
