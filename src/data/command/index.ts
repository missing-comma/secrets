import {
	Arguments,
	InferredOptionType,
	InferredOptionTypes,
	Options,
	PositionalOptions,
} from 'yargs';
import {CamelCaseKey, ChangeArgv} from './types.js';
import {BaseCommandAdapter} from './adapter.js';

export class Command<T = {}> extends BaseCommandAdapter<T> {
	protected update = <A>(change: ChangeArgv<T, A>): Command<A> => {
		this.builders.push(change);
		return this as any;
	};

	positional = <K extends string, O extends PositionalOptions>(
		key: K,
		opt: O,
	): Command<T & {[key in K]: InferredOptionType<O>}> => {
		this.positionalValues.push({...opt, key});
		return this.update((y) => y.positional(key, opt));
	};

	options = <O extends {[key: string]: Options}>(
		options: O,
	): Command<Omit<T, keyof O> & InferredOptionTypes<O>> => {
		this.optionValues.push(Object.values(options));
		return this.update((y) => y.options(options));
	};

	parse = (): {
		[key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key];
	} => {
		const {argv} = this.compose();
		// console.log(argv);
		return argv as any;
	};
}
