import { IIsASCIIChar, IReplaceASCIIChar } from './protocols.js';

export class LoadASCIIHandler implements IIsASCIIChar, IReplaceASCIIChar {
	match = (char: string): boolean => {
		return !!char.match(/\u001b\[.*?m/);
	};
	replace = (char: string, replacer: IReplaceASCIIChar.Replacer): string => {
		return char.replace(/(\u001b\[.*?m)/g, replacer as any);
	};
	strip = (char: string): string => {
		return this.replace(char, '');
	};
}

export const ASCIIHandler = new LoadASCIIHandler();
