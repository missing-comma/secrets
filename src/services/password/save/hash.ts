import {EncryptHash} from '../../../data/encrypt/hash/index.js';

// Hash the password with the salt using PBKDF2
export default async function hashPassword(password: string) {
	return new EncryptHash(16).hash(password);
}
