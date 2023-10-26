export * from '../types.js';

export type StdinWriteState =
	| 'initial'
	| 'clear_placeholder'
	| 'regular'
	| 'back_to_initial'
	| 'silent';
