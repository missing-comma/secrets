import { HashAlgorithm } from './hash-algorith.js';

export interface IConfig {
	readonly passwordHash: string;
	readonly hashingAlgorithm: HashAlgorithm;
}
