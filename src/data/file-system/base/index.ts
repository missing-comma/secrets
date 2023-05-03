import convict from 'convict';
import {homedir} from 'os';
import {join} from 'path';
import {existsSync, mkdirSync} from 'fs';
import {AdapterPGetBaseFS} from './adapter.js';

export abstract class PGetBaseFS<T> extends AdapterPGetBaseFS<T> {
	public readonly path: string;
	private readonly dir: string;
	private readonly missingCommaDir: string;

	constructor(protected readonly name: string, config: convict.Config<T>) {
		super(config);
		this.missingCommaDir = join(homedir(), '.missing-comma');
		this.dir = join(this.missingCommaDir, 'secrets');
		this.path = join(this.dir, name + '.json');

		this.load();
	}

	private load = () => {
		this.ensureDirExists();
		if (!existsSync(this.path)) {
			this.updateFile();
		}
		this.config.loadFile(this.path);
		return this;
	};

	private ensureDirExists = () => {
		if (!existsSync(this.missingCommaDir)) {
			mkdirSync(this.missingCommaDir);
		}
		if (!existsSync(this.dir)) {
			mkdirSync(this.dir);
		}
	};
}
