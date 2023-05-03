const crypto = require('crypto');

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
