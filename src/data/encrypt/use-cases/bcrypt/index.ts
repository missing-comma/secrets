import bcrypt from 'bcrypt';
import { IHasher } from '../../protocol.js';

export class BcryptAdapter implements IHasher {
	constructor(private readonly salt: number) {}

	public readonly name = 'bcrypt';

	hash(value: string): Promise<string> {
		return bcrypt.hash(value, this.salt);
	}

	compare(value: string, hash: string): Promise<boolean> {
		return bcrypt.compare(value, hash);
	}
}
