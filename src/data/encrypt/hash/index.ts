import bcrypt from 'bcrypt';

export class EncryptHash {
	constructor(private readonly salt: number) {}

	hash(value: string): Promise<string> {
		return bcrypt.hash(value, this.salt);
	}

	compare(value: string, hash: string): Promise<boolean> {
		return bcrypt.compare(value, hash);
	}
}
