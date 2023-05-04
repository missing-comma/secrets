import convict from 'convict';
import {join} from 'path';
import {existsSync, mkdirSync} from 'fs';
import {AdapterPGetBaseFS} from './adapter.js';
import {MISSING_COMMA_DIR} from '../../../domain/constants.js';
import {Config} from '../../config/index.js';

export abstract class PGetBaseFS<T> extends AdapterPGetBaseFS<T> {
	public readonly path: string;
	private readonly dir: string;
	private readonly missingCommaDir: string;

	constructor(protected readonly name: string, config: convict.Config<T>) {
		super(config);
		this.missingCommaDir = MISSING_COMMA_DIR;
		this.dir = join(MISSING_COMMA_DIR, Config.resourcesDir.get());
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
