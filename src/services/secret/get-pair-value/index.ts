import { SecretFS } from '../../../data/file-system/index.js';
import { ISecret } from '../../../domain/secrets.js';
import { decrypt } from './decrypt.js';

export class SecretGetValue {
	constructor(private readonly secrets: SecretFS) {}

	public handle: {
		(key: string, password: string | null): string;
		(key: string): ExtendedSecret;
	} = (key: string, password?: string | null): any => {
		if (!this.secrets.has(key)) {
			throw new Error(`Unknown key [ ${key} ]`);
		}
		const instance = new ExtendedSecret(this.secrets, this.secrets.get(key), key);
		if (password !== undefined) {
			return instance.decrypt(password);
		}
		return instance;
	};
}

export class ExtendedSecret implements ISecret {
	constructor(
		private readonly secrets: SecretFS,
		private readonly secret: ISecret,
		public readonly key: string,
	) {}

	public requiresPassword = () => {
		return !this.secrets.passwordlessHandler.isPasswordless(this.value);
	};

	public decrypt = (password: string | null) => {
		return decrypt({
			input: this.value,
			password,
			passwordLessHandler: this.secrets.passwordlessHandler,
		});
	};

	public get value() {
		return this.secret.value;
	}

	public get description() {
		return this.secret.description;
	}
}
