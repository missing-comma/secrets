import convict, { Path, PathValue } from 'convict';
import { writeFileSync } from 'fs';

export abstract class AdapterPGetBaseFS<T> {
	protected abstract readonly path: string;
	constructor(protected readonly config: convict.Config<T>) {}

	/**
	 * @returns the current value of the name property. name can use dot
	 * notation to reference nested values
	 */
	public get = <K extends Path<T> | null | undefined = undefined>(
		name?: K,
	): K extends null | undefined ? T : K extends Path<T> ? PathValue<T, K> : never => {
		return this.config.get(name);
	};

	/**
	 * @returns the default value of the name property. name can use dot
	 * notation to reference nested values
	 */
	public default = <K extends Path<T> | null | undefined = undefined>(
		name?: K,
	): K extends null | undefined ? T : K extends Path<T> ? PathValue<T, K> : never => {
		return this.config.default(name);
	};

	/**
	 * @returns true if the property name is defined, or false otherwise
	 */
	public has = <K extends Path<T>>(name: K): boolean => this.config.has(name);

	/**
	 * Sets the value of name to value. name can use dot notation to reference
	 * nested values, e.g. "database.port". If objects in the chain don't yet
	 * exist, they will be initialized to empty objects
	 */
	public set = <K extends Path<T>>(
		name: K,
		value: K extends Path<T> ? PathValue<T, K> : any,
	): convict.Config<T> => {
		const next = this.config.set(name, value);
		this.updateFile();
		return next;
	};

	public keys = () => {
		return Object.keys(this.config.getProperties() as any);
	};

	protected updateFile = () => {
		const config = this.config.getProperties();
		writeFileSync(this.path, JSON.stringify(config, null, 2));
	};
}
