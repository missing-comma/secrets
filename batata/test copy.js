const crypto = require('crypto');

// The password to use for encryption and decryption
const my_password = 'myPassword';

function encrypt2(plaintext, password, iv) {
	// Create a key buffer with the required length
	const key = crypto.scryptSync(password, 'salt', 32);

	// Create a cipher object with the AES algorithm and the key
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

	// Encrypt the plaintext string
	const encrypted =
		cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex');

	// Concatenate the IV and encrypted data with a delimiter
	return iv.toString('hex') + '' + encrypted;
}

function decrypt2(encrypted, password, iv) {
	// Create a key buffer with the required length
	const key = crypto.scryptSync(password, 'salt', 32);

	// Create a decipher object with the same algorithm, key, and IV
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

	// Decrypt the encrypted string
	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');

	return decrypted;
}

function encrypt(input) {
	// Generate a random initialization vector
	const my_iv = crypto.randomBytes(16);

	// Encrypt the plaintext string
	const encrypted = encrypt2(input, my_password, my_iv);

	console.log('encrypt', {
		input,
		my_iv,
		iv_str: my_iv.toString('hex'),
		encrypted,
	});

	console.log(`encrypt: [${input}] => [${encrypted}]`);
	return encrypted;
}

function decrypt(input) {
	// Generate a random initialization vector for decryption
	const slice = 32; // 24;
	const iv_str = input.slice(0, slice); // Get the first 24 bytes of the encrypted data
	const encryptedData = input.slice(slice);
	// input.slice(25); // Get the remaining bytes of the encrypted data
	const my_iv = Buffer.from(iv_str, 'hex');
	console.log('decrypt', {
		input,
		iv_str,
		my_iv,
		encryptedData,
	});

	// Decrypt the encrypted string
	const decrypted = decrypt2(encryptedData, my_password, my_iv);

	console.log(`decrypt: [${input}] => [${decrypted}]`);
	return decrypted;
}

function stringifyIV(buffer) {
	return buffer.toString('hex');
}
function parseIV(buffer) {
	return Buffer.from(buffer, 'hex');
}
// const iv = crypto.randomBytes(16);
// console.log('iv', iv);
// console.log('iv-str', stringifyIV(iv));
// console.log('iv-parsed', parseIV(stringifyIV(iv)));

function test_size() {
	const out = new Set();
	const diffs = new Set();
	let total = 0;
	for (let i = 0; i < 100; i++) {
		console.log(i);
		for (let j = 0; j < 10000; j++, total++) {
			const curr_iv = crypto.randomBytes(16);
			const iv_str = stringifyIV(curr_iv);
			diffs.add(iv_str);
			out.add(iv_str.length);
		}
	}
	console.log('sizes: ', Array.from(out.values()));
	console.log('#sizes: ', out.size);
	console.log('#diffs: ', diffs.size);
	console.log('total: ', total);
}

// test_size();
const encrypted = encrypt('This is a secret message!');
decrypt(encrypted);
