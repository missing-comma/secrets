const crypto = require('crypto');

// Hash the password with the salt using PBKDF2
async function hashPassword(password) {
	// Generate a random salt
	const salt = crypto.randomBytes(16).toString('hex');

	const hash = await new Promise((resolve, reject) => {
		crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
			if (err) reject(err);
			resolve(derivedKey.toString('hex'));
		});
	});
	return salt + hash;
}

// Check if the entered password matches the stored hash
function checkPassword(password, input) {
	const salt = input.slice(0, 32);
	const hash = input.slice(32);

	return new Promise((resolve, reject) => {
		crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
			if (err) reject(err);
			resolve(hash === derivedKey.toString('hex'));
		});
	});
}

// Example usage
(async () => {
	const password = 'mysecret';
	const hashedPassword = await hashPassword(password);
	console.log('Stored hash:', hashedPassword);

	const enteredPassword = 'mysecret';
	const passwordMatch = await checkPassword(enteredPassword, hashedPassword);
	console.log('Password match:', passwordMatch);

	const wrongPassword = 'wrongpassword';
	const wrongPasswordMatch = await checkPassword(wrongPassword, hashedPassword);
	console.log('Wrong password match:', wrongPasswordMatch);
})();
