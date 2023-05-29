import { HashAlgorithm } from '../../../../../../domain/hash-algorith.js';

export interface IFormValues {
	readonly password: string;
	readonly hashingAlgorithm: HashAlgorithm;
}
