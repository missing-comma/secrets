import { scryptSync, createDecipheriv } from 'crypto';
import { PasswordLessEncryptionHandler } from '../password-less-encryption-handler/index.js';

type Payload = {
	readonly input: string;
	readonly password: string | null;
	readonly passwordLessHandler: PasswordLessEncryptionHandler;
};

function baseDecrypt(input: string, password: string): string {
	const iv = Buffer.from(input.slice(0, 32), 'hex'); // Get the first 24 bytes of the encrypted data
	const encrypted = input.slice(32);

	// Create a key buffer with the required length
	const key = scryptSync(password, 'salt', 32);

	// Create a decipher object with the same algorithm, key, and IV
	const decipher = createDecipheriv('aes-256-cbc', key, iv);

	// Decrypt the encrypted string
	return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

export function decrypt({ input, password, passwordLessHandler }: Payload) {
	password = passwordLessHandler.defaultPassword(password);
	if (passwordLessHandler.isPasswordless(input)) {
		const ejectedInput = passwordLessHandler.ejectIdentifier(input, true);
		return baseDecrypt(ejectedInput, password);
	}
	return baseDecrypt(input, password);
}
