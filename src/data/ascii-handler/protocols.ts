export interface IIsASCIIChar {
	match(char: string): boolean;
}

export interface IReplaceASCIIChar {
	replace(char: string, replacer: IReplaceASCIIChar.Replacer): string;
}

export declare namespace IReplaceASCIIChar {
	export type Replacer = string | ReplacerFn;
	export type ReplacerFn = (substring: string, ...args: any[]) => string;
}
