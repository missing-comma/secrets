// import {pbkdf2} from 'crypto';
import {EncryptHash} from '../../../data/encrypt/hash/index.js';

type Payload = {
	readonly passwordHash: string;
	readonly input: string;
};

// Check if the entered password matches the stored hash
export default async function checkPassword(payload: Payload) {
	const {passwordHash, input} = payload;

	return new EncryptHash(16).compare(input, passwordHash);
}
