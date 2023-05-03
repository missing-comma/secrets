import {scryptSync, createDecipheriv} from 'crypto';

export function decrypt(input: string, password: string): string {
	const iv = Buffer.from(input.slice(0, 32), 'hex'); // Get the first 24 bytes of the encrypted data
	const encrypted = input.slice(32);

	// Create a key buffer with the required length
	const key = scryptSync(password, 'salt', 32);

	// Create a decipher object with the same algorithm, key, and IV
	const decipher = createDecipheriv('aes-256-cbc', key, iv);

	// Decrypt the encrypted string
	return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}
