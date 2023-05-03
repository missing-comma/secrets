const crypto = require('crypto');

// The password to use for encryption and decryption
const my_password = 'myPassword';

function encrypt(input, password) {
	// Generate a random initialization vector
	const iv = crypto.randomBytes(16);

	// Create a key buffer with the required length
	const key = crypto.scryptSync(password, 'salt', 32);

	// Create a cipher object with the AES algorithm and the key
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

	// Encrypt the plaintext string
	const encrypted = cipher.update(input, 'utf8', 'hex') + cipher.final('hex');

	// Concatenate the IV and encrypted data with a delimiter
	return iv.toString('hex') + '' + encrypted;
}

function decrypt(input, password) {
	const iv = Buffer.from(input.slice(0, 32), 'hex'); // Get the first 24 bytes of the encrypted data
	const encrypted = input.slice(32);

	// Create a key buffer with the required length
	const key = crypto.scryptSync(password, 'salt', 32);

	// Create a decipher object with the same algorithm, key, and IV
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

	// Decrypt the encrypted string
	return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

function encrypt2(input, password) {
	// Encrypt the plaintext string
	const encrypted = encrypt(input, password);
	console.log(`encrypt: [${input}] => [${encrypted}]`);
	return encrypted;
}

function decrypt2(input, password) {
	// Decrypt the encrypted string
	const decrypted = decrypt(input, password);
	console.log(`decrypt: [${input}] => [${decrypted}]`);
	return decrypted;
}

const encrypted = encrypt2('This is a secret message!', my_password);
decrypt2(encrypted, my_password);
