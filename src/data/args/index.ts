import {hideBin} from 'yargs/helpers';

type Options = {
	verbose: boolean;
};

export class LoadCommandArgs {
	private options: Options = {} as any;

	getArgv = () => {
		return hideBin(process.argv);
	};

	load = (options: Options) => {
		this.options = options;
	};

	get = <K extends keyof Options>(key: K): Options[K] => this.options[key];
}

export const CommandArgs = new LoadCommandArgs();
