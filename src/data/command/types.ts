import {Argv, InferredOptionType, Options, PositionalOptions} from 'yargs';

/** Convert literal string types like 'foo-bar' to 'FooBar' */
export type PascalCase<S extends string> = string extends S
	? string
	: S extends `${infer T}-${infer U}`
	? `${Capitalize<T>}${PascalCase<U>}`
	: Capitalize<S>;

/** Convert literal string types like 'foo-bar' to 'fooBar' */
export type CamelCase<S extends string> = string extends S
	? string
	: S extends `${infer T}-${infer U}`
	? `${T}${PascalCase<U>}`
	: S;

export type CamelCaseKey<K extends PropertyKey> = K extends string ? Exclude<CamelCase<K>, ''> : K;

export type Alias<O extends Options | PositionalOptions> = O extends {
	alias: infer T;
}
	? T extends Exclude<string, T>
		? {[key in T]: InferredOptionType<O>}
		: {}
	: {};

export type ChangeArgv<From, To> = (yargs: Argv<From>) => Argv<To>;
