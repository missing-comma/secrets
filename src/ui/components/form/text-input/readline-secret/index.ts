import { EventManager, EventObserver } from '../../../../../data/event-manager/index.js';
import { ReadlineInterface, getReadline } from './get-readline.js';
import clipboardy from 'clipboardy';
import chalk from 'chalk';
import { IReadlineProps, StdinWriteState } from './types.js';

type Props = IReadlineProps & {
	stdin: NodeJS.ReadStream;
	stdout: NodeJS.WriteStream;
	query: string;
};

const CLEAR_STDIN = '\x1B[2K\x1B[200D';

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
			onWrite: (stringToWrite: string) => {
				this.onWrite(stringToWrite);
				this.writeCount++;
			},
		});
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

	private moveCursorToStart = () => {
		this.rl.output.cursorTo(this.props.query.length + 1);
		return this;
	};

	private getStdinWriteState = (stringToWrite: string): StdinWriteState => {
		if (this.writeCount === 0) {
			return 'initial';
		}
		if (this.props.sensitive) {
			return 'silent';
		}
		if (this.writeCount === 1) {
			return 'clear_placeholder';
		}
		if (stringToWrite === this.props.query) {
			return 'back_to_initial';
		}
		return 'regular';
	};

	private onWrite = (stringToWrite: string) => {
		const state = this.getStdinWriteState(stringToWrite);

		const write: Record<StdinWriteState, VoidFunction> = {
			clear_placeholder: () => {
				const value = stringToWrite + ' '.repeat(this.placeholder.length());
				this.rl.output.write(value);
				this.moveCursorToStart();
			},
			initial: () => {
				const value = this.props.query + this.placeholder.value();
				this.rl.output.write(value);
				this.moveCursorToStart();
			},
			back_to_initial: () => {
				this.writeCount = 0;
				this.rl.output.write(stringToWrite + this.placeholder.value());
				this.moveCursorToStart();
			},
			regular: () => {
				this.rl.output.write(stringToWrite);
			},
			silent: () => {
				const loader = `[${this.rl.line.length % 2 == 1 ? '=-' : '-='}]`;
				this.clearStdinAndWrite(this.props.query + loader);
			},
		};
		write[state]();
	};

	private placeholder = {
		length: () => {
			if (this.placeholder.has()) {
				return this.props.default.length + 2;
			}
			return 0;
		},
		value: () => {
			const hasPlaceHolder = this.props.default !== undefined && this.props.default !== '';
			if (!hasPlaceHolder) return '';

			return chalk.gray(`(${this.props.default})`);
		},
		has: () => {
			return this.props.default !== undefined;
		},
	};

	private clearStdinAndWrite = (stringToWrite: string) => {
		this.rl.output.write(CLEAR_STDIN + stringToWrite);
		return this;
	};

	private onEnd = async (password: string | Promise<string>) => {
		this.observers.forEach((observer) => observer.off());
		this.observers = [];
		this.rl.close();
		this.props.onSubmit(await password);
	};
}
