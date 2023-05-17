import { createInterface, Interface as ReadlineInterface, ReadLineOptions } from 'readline';

export interface ExtendedReadlineOptions extends ReadLineOptions {
	onWrite: (stringToWrite: string) => any;
}

interface ReadlineExtendedInterface extends ReadlineInterface {
	stdoutMuted: boolean;
	query: string;
	readonly output: NodeJS.WriteStream;
	_writeToOutput: (stringToWrite: string) => any;
}

function getBaseReadline(props: ReadLineOptions): ReadlineExtendedInterface {
	return Object.assign(
		createInterface(props),
		{
			stdoutMuted: true,
			query: '',
		},
		{} as Pick<ReadlineExtendedInterface, 'output' | '_writeToOutput'>,
	);
}

export function getReadline(props: ExtendedReadlineOptions): ReadlineExtendedInterface {
	const readline = getBaseReadline(props);
	readline._writeToOutput = props.onWrite;
	return readline;
}

export type { ReadlineExtendedInterface as ReadlineInterface };
