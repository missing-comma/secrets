import { NO_PASS_SYMBOL, NO_PASS_SYMBOL_POSITION } from '../../../domain/constants.js';
import { stringSplit } from '../../../utils/string-split.js';

export class PasswordLessEncryptionHandler {
	defaultPassword = (password: string | null) => {
		return password || '[default]';
	};

	injectIdentifier = (hash: string, password: string | null) => {
		if (password === null) {
			const [before, after] = stringSplit(hash, NO_PASS_SYMBOL_POSITION);
			return [before, NO_PASS_SYMBOL, after].join('');
		}
		return hash;
	};

	ejectIdentifier = (hash: string, noPassword: boolean) => {
		if (noPassword) {
			const [before, after] = stringSplit(hash, NO_PASS_SYMBOL_POSITION);
			const ejected = [before, after.slice(NO_PASS_SYMBOL.length)].join('');
			return ejected;
		}
		return hash;
	};

	isPasswordless = (hash: string): boolean => {
		const [_, after] = stringSplit(hash, NO_PASS_SYMBOL_POSITION);
		return after.startsWith(NO_PASS_SYMBOL);
	};
}
