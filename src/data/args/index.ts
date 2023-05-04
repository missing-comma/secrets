import {hideBin} from 'yargs/helpers';

export class LoadCommandArgs {
	getArgv = () => {
		return hideBin(process.argv);
	};
}

export const CommandArgs = new LoadCommandArgs();
