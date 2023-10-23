import { randomBytes, scryptSync, createCipheriv } from 'crypto';
import { PasswordLessEncryptionHandler } from '../password-less-encryption-handler/index.js';

type Payload = {
	readonly input: string;
	readonly password: string | null;
	readonly passwordLessHandler: PasswordLessEncryptionHandler;
};

function baseEncrypt(input: string, password: string) {
	// Generate a random initialization vector
	const iv = randomBytes(16);

	// Create a key buffer with the required length
	const key = scryptSync(password, 'salt', 32);

	// Create a cipher object with the AES algorithm and the key
	const cipher = createCipheriv('aes-256-cbc', key, iv);

	// Encrypt the plaintext string
	const encrypted = cipher.update(input, 'utf8', 'hex') + cipher.final('hex');

	// Concatenate the IV and encrypted data with a delimiter
	return iv.toString('hex') + '' + encrypted;
}

export function encrypt({ input, password, passwordLessHandler }: Payload) {
	const output = baseEncrypt(input, passwordLessHandler.defaultPassword(password));
	if (password !== null && passwordLessHandler.isPasswordless(output)) {
		throw new Error(`Unable generate valid password, try again later`);
	}
	return passwordLessHandler.injectIdentifier(output, password);
}
