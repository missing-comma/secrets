import { EventManager, EventObserver } from '../../../../../data/event-manager/index.js';
import { ReadlineInterface, getReadline } from './get-readline.js';
import clipboardy from 'clipboardy';
import chalk from 'chalk';
import { IReadlineProps } from '../types.js';

type Props = IReadlineProps & {
	stdin: NodeJS.ReadStream;
	stdout: NodeJS.WriteStream;
	query: string;
};

const CLEAR_STDIN = ''; //'\x1B[2K\x1B[200D';

type KeyPress = { name: string; ctrl: boolean; meta: boolean };

export class ReadlineSecret {
	private readonly stdinEventManager: EventManager<NodeJS.ReadStream>;
	private observers: Array<EventObserver<any, any>> = [];
	private readonly rl: ReadlineInterface;
	private props: Props;
	private writeCount: number = 0;

	constructor(props: Props) {
		this.props = props;
		const { stdin, stdout } = props;
		this.rl = getReadline({
			input: stdin,
			output: stdout,
			onWrite: (stringToWrite: any) => {
				// console.log({ stringToWrite, count: this.writeCount });
				if (this.writeCount === 0) {
					this.clearStdinAndWrite(this.props.query + chalk.gray(this.props.placeholder));
				} else if (this.writeCount === 1) {
					this.clearStdinAndWrite(stringToWrite + ' '.repeat(props.placeholder.length));
					this.rl.output.cursorTo(this.props.query.length + 1);
				} else if (false && this.rl.stdoutMuted) {
					const loader = `[${this.rl.line.length % 2 == 1 ? '=-' : '-='}]`;
					this.clearStdinAndWrite(loader);
				} else {
					this.rl.output.write(stringToWrite);
				}
				this.writeCount++;
			},
		});
		() => {
			chalk;
			this.clearStdinAndWrite('');
			console.log(this.writeCount);
		};

		// this.rl.question(`${query}${chalk.gray(props.placeholder)}`, (password) => {
		// 	this.onEnd(password);
		// });
		this.rl.question(this.props.query, (password) => {
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

	private clearStdinAndWrite = (stringToWrite: string) => {
		this.rl.output.write(CLEAR_STDIN + stringToWrite);
	};

	private onEnd = async (password: string | Promise<string>) => {
		this.observers.forEach((observer) => observer.off());
		this.observers = [];
		this.rl.close();
		this.props.onSubmit(await password);
	};
}

// Y0kd59|:b?VtCj04g2fG4zA4:ySE0ls*<a6;yq
