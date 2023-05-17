import { EventManager, EventObserver } from '../../../../../data/event-manager/index.js';
import { ReadlineInterface, getReadline } from './get-readline.js';
import clipboardy from 'clipboardy';

type Props = {
	stdin: NodeJS.ReadStream;
	stdout: NodeJS.WriteStream;
	query: string;
	onSubmit(password: string): void;
};

type KeyPress = { name: string; ctrl: boolean; meta: boolean };

export class ReadlineSecret {
	private readonly stdinEventManager: EventManager<NodeJS.ReadStream>;
	private observers: Array<EventObserver<any, any>> = [];
	private readonly rl: ReadlineInterface;
	private props: Props;

	constructor(props: Props) {
		this.props = props;
		const { stdin, stdout, query } = props;
		this.rl = getReadline({
			input: stdin,
			output: stdout,
			onWrite: (stringToWrite: any) => {
				if (this.rl.stdoutMuted)
					this.rl.output.write(
						'\x1B[2K\x1B[200D' +
							query +
							'[' +
							(this.rl.line.length % 2 == 1 ? '=-' : '-=') +
							']',
					);
				else this.rl.output.write(stringToWrite);
			},
		});

		this.rl.question(query, (password) => {
			this.onEnd(password);
		});

		this.stdinEventManager = new EventManager(stdin);
		const keypressObserver = this.stdinEventManager.on('keypress', (_, key: KeyPress) => {
			if (key.name === 'v' && (key.ctrl || key.meta)) {
				this.onEnd(clipboardy.read());
			}
		});
		this.observers.push(keypressObserver);
	}

	// private writeTerminal = (query: string, input: string) => {
	// 	const clear = '\x1B[2K\x1B[200D';
	// 	const loader = input.length % 2 == 1 ? '=-' : '-=';
	// 	return `${clear}${query}${loader}`;
	// };

	private onEnd = async (password: string | Promise<string>) => {
		this.observers.forEach((observer) => observer.off());
		this.observers = [];
		this.rl.close();
		this.props.onSubmit(await password);
	};
}

// Y0kd59|:b?VtCj04g2fG4zA4:ySE0ls*<a6;yq
