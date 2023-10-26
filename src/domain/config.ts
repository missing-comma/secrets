import { HashAlgorithm } from './hash-algorith.js';

export interface IConfig {
	readonly passwordHash: string;
	readonly hashingAlgorithm: HashAlgorithm;
	readonly readSecret: IConfig.ReadSecret;
}

export declare namespace IConfig {
	export interface ReadSecret {
		readonly pauseTimeoutAfterCommand: number;
		readonly output: ReadSecret.Output;
	}

	export namespace ReadSecret {
		export type Output = 'clipboard' | 'terminal';
	}
}

export const SUPPORTED_READ_SECRET_OUTPUT = ['clipboard', 'terminal'] as const;
